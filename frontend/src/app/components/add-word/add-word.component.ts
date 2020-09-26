import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ApiService } from 'src/app/services/api.service'
import { LanguagesService } from 'src/app/services/languages.service'
import { GroupsService } from 'src/app/services/groups.service'
import { Group } from 'src/app/types/group.types'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective
  @ViewChild('groupInput') groupInput: ElementRef<HTMLInputElement>

  form: FormGroup

  groups: Group[] = []
  selectedGroups: Group[] = []
  filtredGroups: Group[] = []

  groupCtrl = new FormControl()

  separatorKeysCodes: number[] = [ENTER, COMMA]

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private groupsService: GroupsService,
    public languagesService: LanguagesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      word: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      lang: new FormControl('')
    })

    this.groupCtrl.valueChanges.subscribe((val) => {
      this.filterGroupsToShow(val)
    })

    this.groupsService.getGroups().then((g) => {
      this.groups = [...g]
      this.filtredGroups = [...g]
    })
  }

  async handleSubmit() {
    let action: string
    const { word, lang } = this.form.value
    const lastLang = lang

    try {
      const newWord = await this.apiService.addWord(lang, {
        word,
        groups: this.selectedGroups.length ? this.selectedGroups.map((g) => g.id) : null
      })

      action = `Word: ${newWord.word} was successfully created`
    } catch (err) {
      action = `Something went wrong: ${err.message}`
    }

    this.formGroupDirective.resetForm()
    this.form.controls.lang.setValue(lastLang)

    this.snackBar.open(action, 'Close', {
      duration: 5000
    })
  }

  handleGroupRemove(group: Group) {
    this.selectedGroups.splice(
      this.selectedGroups.findIndex((g) => g.id === group.id),
      1
    )
    this.filterGroupsToShow(this.groupCtrl.value)
  }

  handleGroupSelect(event: MatAutocompleteSelectedEvent): void {
    this.selectedGroups.push(this.groups.find((g) => g.id === event.option.value))
    this.groupInput.nativeElement.value = ''
    this.groupCtrl.setValue(null)
    this.filterGroupsToShow('')
  }

  filterGroupsToShow(val: string) {
    this.filtredGroups = this.groups.filter(
      (g) =>
        (!val || new RegExp(`^${val}`).test(g.name)) &&
        this.selectedGroups.findIndex((sg) => sg.id === g.id) === -1
    )
  }
}

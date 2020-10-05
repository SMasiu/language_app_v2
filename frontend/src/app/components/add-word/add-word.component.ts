import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core'
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ApiService } from 'src/app/services/api.service'
import { LanguagesService } from 'src/app/services/languages.service'
import { GroupsService } from 'src/app/services/groups.service'
import { Group } from 'src/app/types/group.types'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { Word } from 'src/app/types/word.types'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { table } from 'console'
import { take, map } from 'rxjs/operators'

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective
  @ViewChild('groupInput') groupInput: ElementRef<HTMLInputElement>

  @Output()
  create: EventEmitter<Word> = new EventEmitter()

  @Input()
  updateMode: boolean = false

  updatingWord: Word

  @Input()
  langInp: string

  @Input()
  wordInp: string

  form: FormGroup

  groups: Group[] = []
  selectedGroups: Group[] = []
  filtredGroups: Group[] = []

  groupCtrl = new FormControl()

  separatorKeysCodes: number[] = [ENTER, COMMA]

  ctrlSub: Subscription

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private groupsService: GroupsService,
    private route: ActivatedRoute,
    private router: Router,
    public languagesService: LanguagesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      word: new FormControl(this.wordInp, [Validators.required, Validators.maxLength(50)]),
      lang: new FormControl(this.langInp || '')
    })

    this.ctrlSub = this.groupCtrl.valueChanges.subscribe((val) => {
      this.filterGroupsToShow(val)
    })

    this.groupsService.getGroups().then((g) => {
      this.groups = [...g]
      this.filtredGroups = [...g]
    })

    if (this.updateMode) {
      this.route.paramMap
        .pipe(
          take(1),
          map((params) => ({ id: parseInt(params.get('id')), lang: params.get('lang') }))
        )
        .subscribe(async ({ id, lang }) => {
          this.updatingWord = await this.apiService.getWordById(lang, id)

          this.form.setValue({ lang, word: this.updatingWord.word })

          this.selectedGroups = [...this.updatingWord.groups]
        })
    }
  }

  handleSubmit() {
    this.updateMode ? this.handleUpdateWord() : this.handleAddWord()
  }

  async handleAddWord() {
    let action: string
    const { word, lang } = this.form.value
    const lastLang = lang

    try {
      const newWord = await this.apiService.addWord(lang, {
        word,
        groups: this.selectedGroups.length ? this.selectedGroups.map((g) => g.id) : null
      })

      action = `Word: ${newWord.word} was successfully created`

      this.create.emit(newWord)
    } catch (err) {
      action = `Something went wrong: ${err.message}`
    }

    this.formGroupDirective.resetForm()
    this.form.controls.lang.setValue(lastLang)

    this.snackBar.open(action, 'Close', {
      duration: 5000
    })
  }

  async handleUpdateWord() {
    const { word, lang } = this.form.value

    let message: string

    try {
      const updatedWord = await this.apiService.updateWord(lang, this.updatingWord.id, {
        word,
        groups: this.selectedGroups.length ? this.selectedGroups.map((g) => g.id) : null
      })

      message = `Successfully updated word: ${updatedWord.word}`
    } catch (err) {
      message = `Something goes wrong: ${err.message}`
    }

    this.snackBar.open(message, 'Close', {
      duration: 5000
    })

    this.router.navigateByUrl(`/words/${lang}/${this.updatingWord.id}`)
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

  ngOnDestroy() {
    this.ctrlSub.unsubscribe()
  }
}

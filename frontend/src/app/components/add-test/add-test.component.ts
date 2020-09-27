import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { LanguagesService } from 'src/app/services/languages.service'
import { Group } from 'src/app/types/group.types'
import { ENTER, COMMA } from '@angular/cdk/keycodes'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { Subscription } from 'rxjs'
import { GroupsService } from 'src/app/services/groups.service'

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective
  @ViewChild('groupInput') groupInput: ElementRef<HTMLInputElement>

  groupCtrl = new FormControl()
  separatorKeysCodes: number[] = [ENTER, COMMA]

  form: FormGroup

  groups: Group[] = []
  selectedGroups: Group[] = []
  filtredGroups: Group[] = []

  ctrlSub: Subscription

  constructor(public languagesService: LanguagesService, private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      langFrom: new FormControl('', [Validators.required]),
      langTo: new FormControl('', [Validators.required]),
      limit: new FormControl(25, [Validators.min(1)]),
      skip: new FormControl(0, [Validators.min(0)])
    })

    this.ctrlSub = this.groupCtrl.valueChanges.subscribe((val) => {
      this.filterGroupsToShow(val)
    })

    this.groupsService.getGroups().then((g) => {
      this.groups = [...g]
      this.filtredGroups = [...g]
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

  handleSubmit() {
    console.log(this.form.value)
  }

  ngOnDestroy() {
    this.ctrlSub.unsubscribe()
  }
}

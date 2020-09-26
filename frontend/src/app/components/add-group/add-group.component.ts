import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective

  form: FormGroup

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(25)])
    })
  }

  async handleSubmit() {
    let action: string

    try {
      const group = await this.apiService.addGroup({
        ...this.form.value
      })

      action = `Group: ${group.name} was successfully created`
    } catch (err) {
      action = `Something went wrong: ${err.message}`
    }

    this.formGroupDirective.resetForm()

    this.snackBar.open(action, 'Close', {
      duration: 5000
    })
  }
}

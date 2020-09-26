import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective

  form: FormGroup

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      word: new FormControl('', [Validators.required, Validators.maxLength(25)])
      // groups: new FormControl(''),
      // lang: new FormControl('en')
    })
  }

  async handleSubmit() {
    let action: string

    try {
      const { word } = this.form.value
      const newWord = await this.apiService.addWord('en', {
        word,
        groups: [] // groups.length ? groups : null
      })

      action = `Word: ${newWord.word} was successfully created`
    } catch (err) {
      action = `Something went wrong: ${err.message}`
    }

    this.formGroupDirective.resetForm()

    this.snackBar.open(action, 'Close', {
      duration: 5000
    })
  }
}

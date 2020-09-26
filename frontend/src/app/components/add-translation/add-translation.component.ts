import { Component, OnInit } from '@angular/core'
import { LanguagesService } from 'src/app/services/languages.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.scss']
})
export class AddTranslationComponent implements OnInit {
  form: FormGroup

  constructor(public languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      fromLang: new FormControl('', [Validators.required]),
      toLang: new FormControl('', [Validators.required])
    })
  }

  handleSubmit() {
    console.log(this.form.value)
  }
}

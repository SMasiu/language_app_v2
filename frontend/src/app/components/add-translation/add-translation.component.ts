import { Component, OnInit, OnDestroy } from '@angular/core'
import { LanguagesService } from 'src/app/services/languages.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { Subscription } from 'rxjs'
import { Word } from 'src/app/types/word.types'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-add-translation',
  templateUrl: './add-translation.component.html',
  styleUrls: ['./add-translation.component.scss']
})
export class AddTranslationComponent implements OnInit, OnDestroy {
  form: FormGroup
  wordFromCtrl = new FormControl('')
  wordToCtrl = new FormControl('')
  fromCtrlSub: Subscription
  toCtrlSub: Subscription
  formToLangSub: Subscription
  formFromLangSub: Subscription

  wordsFromList: Word[] = []
  wordsToList: Word[] = []

  selectedFromWord: Word
  selectedToWord: Word

  showAddFromWord: boolean = false
  showAddToWord: boolean = false

  lastFromWord: string = ''
  lastToWord: string = ''

  constructor(
    public languagesService: LanguagesService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      fromLang: new FormControl('', [Validators.required]),
      toLang: new FormControl('', [Validators.required])
    })

    this.wordFromCtrl.valueChanges
      .pipe(debounceTime(100))
      .subscribe(async (val: string | Word | { toggler: boolean }) => {
        if (typeof val === 'string') {
          this.selectedFromWord = null
          this.lastFromWord = val
          this.wordsFromList = [
            ...(await this.apiService.searchWords(this.form.value.fromLang, val))
          ]
        } else if (!(val as any).toggler) {
          const { word } = val as Word
          this.lastFromWord = word
          this.wordsFromList = [
            ...(await this.apiService.searchWords(this.form.value.fromLang, word))
          ]
        }
      })
    this.wordToCtrl.valueChanges
      .pipe(debounceTime(100))
      .subscribe(async (val: string | Word | { toggler: boolean }) => {
        if (typeof val === 'string') {
          this.selectedToWord = null
          this.lastToWord = val
          this.wordsToList = [...(await this.apiService.searchWords(this.form.value.toLang, val))]
        } else if (!(val as any).toggler) {
          const { word } = val as Word
          this.lastToWord = word
          this.wordsToList = [...(await this.apiService.searchWords(this.form.value.toLang, word))]
        }
      })
    this.formFromLangSub = this.form.controls.fromLang.valueChanges.subscribe(
      async (lang: string) => {
        this.wordFromCtrl.setValue('')
        this.wordsFromList = [...(await this.apiService.searchWords(lang, this.wordFromCtrl.value))]
      }
    )
    this.formToLangSub = this.form.controls.toLang.valueChanges.subscribe(async (lang: string) => {
      this.wordToCtrl.setValue('')
      this.wordsToList = [...(await this.apiService.searchWords(lang, this.wordToCtrl.value))]
    })
  }

  async handleSubmit() {
    let message: string
    const { fromLang, toLang } = this.form.value
    try {
      const translation = await this.apiService.addTranslation(
        { lang: fromLang, wordId: this.selectedFromWord.id },
        { lang: toLang, wordId: this.selectedToWord.id }
      )
      message = `Translation: ${translation.word1.word.word} -> ${translation.word2.word.word} was succesfully created`
    } catch (err) {
      message = `Something went wrong: ${err.message}`
    }

    this.snackBar.open(message, 'Close', {
      duration: 5000
    })
  }

  ngOnDestroy() {
    this.fromCtrlSub.unsubscribe()
    this.toCtrlSub.unsubscribe()
    this.formFromLangSub.unsubscribe()
    this.formToLangSub.unsubscribe()
  }

  displayWord(word: Word): string {
    return word && word.word ? word.word : ''
  }

  selectToWord(word: Word) {
    this.selectedToWord = word
  }

  selectFromWord(word: Word) {
    this.selectedFromWord = word
  }

  toggleShowFromAddForm() {
    this.showAddFromWord = !this.showAddFromWord
  }

  toggleShowToAddForm() {
    this.showAddToWord = !this.showAddToWord
  }

  handleWordFromCreated(word: Word) {
    this.toggleShowFromAddForm()
    this.selectedFromWord = { ...word }
    this.wordFromCtrl.setValue({ ...word })
  }

  handleWordToCreated(word: Word) {
    this.toggleShowToAddForm()
    this.selectedToWord = { ...word }
    this.wordToCtrl.setValue({ ...word })
  }
}

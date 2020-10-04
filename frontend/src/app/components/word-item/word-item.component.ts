import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { take } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { Word } from 'src/app/types/word.types'
import { Translate } from 'src/app/types/translate.types'
import { FormControl } from '@angular/forms'
import { LanguagesService } from 'src/app/services/languages.service'
import { Subscription } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss']
})
export class WordItemComponent implements OnInit {
  lang: string

  word: Word
  translations: Translate

  langSub: Subscription
  langCtrl: FormControl = new FormControl('')

  displayedColumns: string[] = ['id', 'word', 'delete']

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public languagesService: LanguagesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe(async (params) => {
      this.lang = params.get('lang')
      const id = parseInt(params.get('id'))

      this.word = await this.apiService.getWordById(this.lang, id)

      this.langSub = this.langCtrl.valueChanges.subscribe(async (translationLang: string) => {
        this.translations = {
          ...(await this.apiService.translateByWordId(id, this.lang, translationLang))
        }
      })
    })
  }

  async handleDeleteWord() {
    let message: string
    let delErr: boolean = false
    try {
      await this.apiService.deleteWord(this.lang, this.word.id)
      message = `Successfully deleted word: ${this.word.word}`
    } catch (err) {
      delErr = true
      message = `Something goes wrong: ${err.message}`
    }

    this.snackBar.open(message, 'Close', {
      duration: 5000
    })

    if (!delErr) {
      this.router.navigateByUrl('/words')
    }
  }
}

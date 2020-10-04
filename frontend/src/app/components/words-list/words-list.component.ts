import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { PageEvent } from '@angular/material/paginator'
import { Word } from 'src/app/types/word.types'
import { LanguagesService } from 'src/app/services/languages.service'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent implements OnInit, OnDestroy {
  words: Word[] = []
  wordsCount: number = 0

  searchSub: Subscription
  searchCtrl: FormControl = new FormControl('')

  langSub: Subscription
  langCtrl: FormControl = new FormControl('')

  skipWords: number = 0
  limitWords: number = 25

  displayedColumns: string[] = ['id', 'word', 'action']

  constructor(public languagesService: LanguagesService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.searchSub = this.searchCtrl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(() => this.fetchWords())

    this.langSub = this.langCtrl.valueChanges.subscribe(() => this.fetchWords())
  }

  handlePageSize(e: PageEvent) {
    this.skipWords = e.pageIndex * this.limitWords
    this.fetchWords()
  }

  async fetchWords() {
    const lang = this.langCtrl.value
    const search = this.searchCtrl.value

    const { skipWords, limitWords } = this

    if (lang) {
      const { getAllWords, getAllWordsCount } = await this.apiService.getAllWords(
        lang,
        { search },
        { skip: skipWords, limit: limitWords }
      )

      this.wordsCount = getAllWordsCount.count
      this.words = [...getAllWords]
    }
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe()
    this.langSub.unsubscribe()
  }
}

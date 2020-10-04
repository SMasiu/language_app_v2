import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { take } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { Word } from 'src/app/types/word.types'
import { Translate } from 'src/app/types/translate.types'

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss']
})
export class WordItemComponent implements OnInit {
  word: Word
  translations: Translate
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(take(1)).subscribe(async (params) => {
      const lang = params.get('lang')
      const id = parseInt(params.get('id'))

      this.word = await this.apiService.getWordById(lang, id)
      console.log(this.word)
      this.translations = await this.apiService.translateByWordId(id, lang, 'pl')
      console.log(this.translations)
    })
  }
}

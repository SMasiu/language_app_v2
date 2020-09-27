import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Test } from 'src/app/types/test.types'
import { take } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { Word } from 'src/app/types/word.types'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.scss']
})
export class SolveTestComponent implements OnInit {
  test: Test

  progressCurrent = 12
  progressMax = 34

  wordsToSolve: number[] = []
  currentWordIndex: number = 0
  currentWord: Word

  form: FormGroup

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      answer: new FormControl('')
    })

    this.route.paramMap.pipe(take(1)).subscribe(async (params) => {
      const id = parseInt(params.get('id'))
      this.test = await this.apiService.getTestById(id)
      this.wordsToSolve = [...this.test.words]
      this.currentWord = await this.apiService.getWordById(
        this.test.langFrom,
        this.wordsToSolve[this.currentWordIndex]
      )
      console.log(this.currentWord)
    })
  }

  getProgressValue() {
    return (this.progressCurrent / this.progressMax) * 100
  }

  async handleAnswer() {
    console.log(this.form.value)
    const { langFrom, langTo } = this.test
    const translate = await this.apiService.translateByWordId(this.currentWord.id, langFrom, langTo)
    console.log(translate)
  }
}

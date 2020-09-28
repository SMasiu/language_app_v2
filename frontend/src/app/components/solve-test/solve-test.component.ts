import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Test } from 'src/app/types/test.types'
import { take } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { Word } from 'src/app/types/word.types'
import { FormGroup, FormControl } from '@angular/forms'
import { Translate } from 'src/app/types/translate.types'

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.scss']
})
export class SolveTestComponent implements OnInit {
  test: Test

  progressCurrent: number = 0
  progressMax: number

  wordsToSolve: number[] = []
  currentWordIndex: number = 0
  currentWord: Word

  form: FormGroup
  finished: boolean = false
  tryCounter: number = 0

  lastTranslation: Translate
  lastAnswerResunt: boolean
  lastWordToSolve: Word

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
      this.progressMax = this.wordsToSolve.length
    })
  }

  getProgressValue() {
    return (this.progressCurrent / this.progressMax) * 100
  }

  async handleAnswer() {
    const { langFrom, langTo } = this.test
    const translate = await this.apiService.translateByWordId(this.currentWord.id, langFrom, langTo)
    const isValidAnswer = this.isValidAnswer(translate.wordTranslations)

    this.lastTranslation = { ...translate }

    this.tryCounter++

    console.log(translate)

    if (isValidAnswer) {
      this.lastAnswerResunt = true
      this.progressCurrent++
      this.wordsToSolve.splice(this.currentWordIndex, 1)

      if (this.currentWordIndex === this.wordsToSolve.length) {
        this.currentWordIndex = 0
      }
      if (this.wordsToSolve.length) {
        this.lastWordToSolve = { ...this.currentWord }
        this.currentWord = await this.apiService.getWordById(
          this.test.langFrom,
          this.wordsToSolve[this.currentWordIndex]
        )
      } else {
        console.log('win')
        this.finished = true
      }
    } else {
      this.lastAnswerResunt = false
      this.currentWordIndex += 1

      if (this.currentWordIndex === this.wordsToSolve.length) {
        this.currentWordIndex = 0
      }
      this.lastWordToSolve = { ...this.currentWord }
      this.currentWord = await this.apiService.getWordById(
        this.test.langFrom,
        this.wordsToSolve[this.currentWordIndex]
      )
    }

    this.form.controls.answer.setValue('')
  }

  isValidAnswer(correctWords: Word[]): boolean {
    const { answer }: { answer: string } = this.form.value

    return (
      correctWords.findIndex((w) => w.word.toLowerCase().trim() === answer.toLowerCase().trim()) !==
      -1
    )
  }
}

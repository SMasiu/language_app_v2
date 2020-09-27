import { Word } from './word.types'

export interface TranslationWordOptions {
  lang: string
  wordId: number
}

export interface TranslationWord {
  lang: string
  word: Word
}

export interface Translation {
  id: number
  word1: TranslationWord
  word2: TranslationWord
}

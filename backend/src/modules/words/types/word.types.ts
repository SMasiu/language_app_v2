export interface WordModel {
  id: number
  word: string
}

export interface GetWordsGroupOptions {
  langFrom: string
  groups: number[]
  skip: number
  limit: number
}

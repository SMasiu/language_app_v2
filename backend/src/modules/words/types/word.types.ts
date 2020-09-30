export interface WordModel {
  id: number
  word: string
}

export interface GetWordsGroupOptions {
  groups: number[]
  skip: number
  limit: number
}

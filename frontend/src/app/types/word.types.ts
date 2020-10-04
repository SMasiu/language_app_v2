import { Group } from './group.types'

export interface Word {
  id: number
  lang: string
  word: string
  groups: Group[]
}

export interface WordInput {
  word: string
  groups: number[]
}

export interface GetAllWordsParams {
  search: string
}

export interface PagingParams {
  skip: number
  limit: number
}

export interface GetAllWordsResponse {
  getAllWords: Word[]
  getAllWordsCount: {
    count: number
  }
}

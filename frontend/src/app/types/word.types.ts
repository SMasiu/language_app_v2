import { Group } from './group.types'

export interface Word {
  id: number
  lang: string
  word: string
  groups: Group
}

export interface WordInput {
  word: string
  groups: number[]
}

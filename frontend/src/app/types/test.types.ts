export interface TestParams {
  groups?: string[]
  limit?: number
  skip?: number
  langFrom: string
  langTo: string
}

export interface Test {
  id: number
  langFrom: string
  langTo: string
  words: number[]
}

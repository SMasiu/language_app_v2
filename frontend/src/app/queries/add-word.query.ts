import { gql } from 'apollo-angular'

export const addWordQuery = gql`
  mutation addWord($word: WordInput!, $lang: String!) {
    addWord(word: $word, lang: $lang) {
      id
      word
      lang
      groups {
        id
        name
      }
    }
  }
`

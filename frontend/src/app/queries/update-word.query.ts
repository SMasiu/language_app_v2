import { gql } from 'apollo-angular'

export const updateWordQuery = gql`
  mutation updateWord($lang: String!, $id: Int!, $newWord: WordInput!) {
    updateWord(lang: $lang, id: $id, newWord: $newWord) {
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

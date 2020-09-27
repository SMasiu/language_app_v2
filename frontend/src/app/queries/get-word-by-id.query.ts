import { gql } from 'apollo-angular'

export const getWordByIdQuery = gql`
  query getWordById($id: Int!, $lang: String!) {
    getWordById(id: $id, lang: $lang) {
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

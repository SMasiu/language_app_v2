import { gql } from 'apollo-angular'

export const searchWordsQuery = gql`
  query searchWords($search: String!, $lang: String!) {
    searchWords(search: $search, lang: $lang) {
      id
      word
    }
  }
`

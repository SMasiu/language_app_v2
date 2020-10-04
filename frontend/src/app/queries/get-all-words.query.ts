import { gql } from 'apollo-angular'

export const getAllWordsQuery = gql`
  query getAllWords($lang: String!, $paging: PagingArgs!, $params: GetWordsParams!) {
    getAllWords(lang: $lang, paging: $paging, params: $params) {
      id
      word
    }
    getAllWordsCount(lang: $lang, params: $params) {
      count
    }
  }
`

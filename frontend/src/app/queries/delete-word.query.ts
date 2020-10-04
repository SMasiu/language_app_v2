import { gql } from 'apollo-angular'

export const deleteWordQuery = gql`
  mutation deleteWord($lang: String!, $id: Int!) {
    deleteWord(lang: $lang, id: $id) {
      id
    }
  }
`

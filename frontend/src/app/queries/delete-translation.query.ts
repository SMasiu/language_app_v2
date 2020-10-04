import { gql } from 'apollo-angular'

export const deleteTranslationQuery = gql`
  mutation deleteTranslation($from: TranslationWordInput!, $to: TranslationWordInput!) {
    deleteTranslation(from: $from, to: $to) {
      word1 {
        word {
          id
        }
      }
      word2 {
        word {
          id
        }
      }
    }
  }
`

import { gql } from 'apollo-angular'

export const addTranslationQuery = gql`
  mutation addTranslation($from: TranslationWordInput!, $to: TranslationWordInput!) {
    addTranslation(from: $from, to: $to) {
      id
      word1 {
        lang
        word {
          lang
          id
          word
          groups {
            id
            name
          }
        }
      }
      word2 {
        lang
        word {
          lang
          id
          word
          groups {
            id
            name
          }
        }
      }
    }
  }
`

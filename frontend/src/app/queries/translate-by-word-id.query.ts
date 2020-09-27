import { gql } from 'apollo-angular'

export const translateByWordIdQuery = gql`
  query translateWordByWordId($wordId: Int!, $from: String!, $to: String!) {
    translateWordByWordId(wordId: $wordId, from: $from, to: $to) {
      wordTranslations {
        id
        word
        lang
      }
    }
  }
`

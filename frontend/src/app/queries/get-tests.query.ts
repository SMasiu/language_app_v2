import { gql } from 'apollo-angular'

export const getTestsQuery = gql`
  {
    getAllTests {
      id
      langTo
      langFrom
      words
    }
  }
`

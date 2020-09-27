import { gql } from 'apollo-angular'

export const addTestQuery = gql`
  mutation createTest($testParams: CreateTestInput!) {
    createTest(testParams: $testParams) {
      id
      langTo
      langFrom
      words
    }
  }
`

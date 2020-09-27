import { gql } from 'apollo-angular'

export const getTestByIdQuery = gql`
  query getTestById($id: Int!) {
    getTestById(id: $id) {
      id
      langTo
      langFrom
      words
    }
  }
`

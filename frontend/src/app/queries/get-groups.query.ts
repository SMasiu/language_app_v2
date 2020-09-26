import { gql } from 'apollo-angular'

export const getGroupsQuery = gql`
  {
    getAllGroups {
      id
      name
    }
  }
`

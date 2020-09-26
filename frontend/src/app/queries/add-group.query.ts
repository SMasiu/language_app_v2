import { gql } from 'apollo-angular'

export const addGroupQuery = gql`
  mutation addGroup($group: GroupInput!) {
    addGroup(group: $group) {
      name
      id
    }
  }
`

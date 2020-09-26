import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { addGroupQuery } from '../queries/add-group.query'
import { take, map } from 'rxjs/operators'
import { Group, GroupInput } from '../types/group.types'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  addGroup(group: GroupInput): Promise<Group> {
    return this.apollo
      .mutate<{ addGroup: Group }>({
        mutation: addGroupQuery,
        variables: {
          group
        }
      })
      .pipe(
        take(1),
        map((r) => r.data.addGroup)
      )
      .toPromise()
  }
}

import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { addGroupQuery } from '../queries/add-group.query'
import { take, map } from 'rxjs/operators'
import { Group, GroupInput } from '../types/group.types'
import { WordInput, Word } from '../types/word.types'
import { addWordQuery } from '../queries/add-word.query'

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

  addWord(lang: string, word: WordInput): Promise<Word> {
    return this.apollo
      .mutate<{ addWord: Word }>({
        mutation: addWordQuery,
        variables: {
          word,
          lang
        }
      })
      .pipe(
        take(1),
        map((r) => r.data.addWord)
      )
      .toPromise()
  }
}

import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { addGroupQuery } from '../queries/add-group.query'
import { take, map } from 'rxjs/operators'
import { Group, GroupInput } from '../types/group.types'
import { WordInput, Word } from '../types/word.types'
import { addWordQuery } from '../queries/add-word.query'
import { getGroupsQuery } from '../queries/get-groups.query'
import { searchWordsQuery } from '../queries/search-words.query'

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

  getAllGrops(): Promise<Group[]> {
    return this.apollo
      .query<{ getAllGroups: Group[] }>({
        query: getGroupsQuery
      })
      .pipe((take(1), map((r) => r.data.getAllGroups)))
      .toPromise()
  }

  searchWords(lang: string, search: string): Promise<Word[]> {
    return this.apollo
      .query<{ searchWords: Word[] }>({
        query: searchWordsQuery,
        variables: {
          lang,
          search
        }
      })
      .pipe(
        take(1),
        map((r) => r.data.searchWords)
      )
      .toPromise()
  }
}

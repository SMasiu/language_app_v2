import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { addGroupQuery } from '../queries/add-group.query'
import { take, map } from 'rxjs/operators'
import { Group, GroupInput } from '../types/group.types'
import {
  WordInput,
  Word,
  GetAllWordsParams,
  PagingParams,
  GetAllWordsResponse
} from '../types/word.types'
import { addWordQuery } from '../queries/add-word.query'
import { getGroupsQuery } from '../queries/get-groups.query'
import { searchWordsQuery } from '../queries/search-words.query'
import { Translation, TranslationWordOptions } from '../types/translation.types'
import { addTranslationQuery } from '../queries/add-translation.query'
import { TestParams, Test } from '../types/test.types'
import { addTestQuery } from '../queries/add-test.query'
import { getTestsQuery } from '../queries/get-tests.query'
import { getTestByIdQuery } from '../queries/get-test-by-id.query'
import { getWordByIdQuery } from '../queries/get-word-by-id.query'
import { Translate } from '../types/translate.types'
import { translateByWordIdQuery } from '../queries/translate-by-word-id.query'
import { getAllWordsQuery } from '../queries/get-all-words.query'
import { deleteWordQuery } from '../queries/delete-word.query'

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

  addTranslation(
    word1: TranslationWordOptions,
    word2: TranslationWordOptions
  ): Promise<Translation> {
    return this.apollo
      .mutate<{ addTranslation: Translation }>({
        mutation: addTranslationQuery,
        variables: {
          from: word1,
          to: word2
        }
      })
      .pipe(
        take(1),
        map((r) => r.data.addTranslation)
      )
      .toPromise()
  }

  addTest(testParams: TestParams): Promise<Test> {
    return this.apollo
      .mutate<{ createTest: Test }>({
        mutation: addTestQuery,
        variables: {
          testParams: { ...testParams }
        }
      })
      .pipe(
        take(1),
        map((r) => r.data.createTest)
      )
      .toPromise()
  }

  getTests(): Promise<Test[]> {
    return this.apollo
      .query<{ getAllTests: Test[] }>({
        query: getTestsQuery
      })
      .pipe(
        take(1),
        map((r) => r.data.getAllTests)
      )
      .toPromise()
  }

  getTestById(id: number): Promise<Test> {
    return this.apollo
      .query<{ getTestById: Test }>({
        query: getTestByIdQuery,
        variables: {
          id
        }
      })
      .pipe(
        take(1),
        map((r) => r.data.getTestById)
      )
      .toPromise()
  }

  getWordById(lang: string, id: number): Promise<Word> {
    return this.apollo
      .query<{ getWordById: Word }>({
        query: getWordByIdQuery,
        variables: {
          lang,
          id
        }
      })
      .pipe(
        take(1),
        map((r) => r.data.getWordById)
      )
      .toPromise()
  }

  translateByWordId(wordId: number, from: string, to: string): Promise<Translate> {
    return this.apollo
      .query<{ translateWordByWordId: Translate }>({
        query: translateByWordIdQuery,
        variables: {
          wordId,
          from,
          to
        }
      })
      .pipe(
        take(1),
        map((r) => r.data.translateWordByWordId)
      )
      .toPromise()
  }

  getAllWords(
    lang: string,
    params: GetAllWordsParams,
    paging: PagingParams
  ): Promise<GetAllWordsResponse> {
    return this.apollo
      .query<GetAllWordsResponse>({
        query: getAllWordsQuery,
        variables: {
          lang,
          paging: { ...paging },
          params: { ...params }
        }
      })
      .pipe(
        take(1),
        map((r) => r.data)
      )
      .toPromise()
  }

  deleteWord(lang: string, id: number): Promise<Word> {
    return this.apollo
      .mutate<{ deleteWord: Word }>({
        mutation: deleteWordQuery,
        variables: {
          lang,
          id
        }
      })
      .pipe(
        take(1),
        map((r) => r.data.deleteWord)
      )
      .toPromise()
  }
}

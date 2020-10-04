import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/modules/database/services/database.service'
import { WordArgs, GetAllWordsArgs, GetAllWordsCountArgs } from '../graphql/word.args'
import { WordModel, GetWordsGroupOptions } from '../types/word.types'
import { GroupsService } from 'src/modules/groups/services/groups.service'
import { Word } from '../graphql/word.type'

@Injectable()
export class WordsService {
  constructor(private database: DatabaseService, private groupService: GroupsService) {}

  async addWord({ word, lang }: WordArgs) {
    const dbWord = await this.checkIfWordExists(lang, word.word)

    if (dbWord) {
      return {
        ...dbWord,
        lang
      }
    }

    const newWord = (
      await this.database.query<WordModel>(
        `
        INSERT INTO words_${lang} (word) VALUES ($1) RETURNING *
      `,
        [word.word]
      )
    )[0]

    await this.groupService.addGroupsToWord(lang, newWord.id, word.groups)

    return {
      ...newWord,
      lang
    }
  }

  async checkIfWordExists(lang: string, word: string): Promise<WordModel | undefined> {
    return (
      await this.database.query<WordModel>(
        `
      SELECT * FROM words_${lang} WHERE word = $1
    `,
        [word]
      )
    )[0]
  }

  async getWordById(lang: string, wordId: number): Promise<Omit<Word, 'groups'> | null> {
    const word =
      (
        await this.database.query<WordModel>(
          `
      SELECT * FROM words_${lang} WHERE id = $1
    `,
          [wordId]
        )
      )[0] || null

    return word ? { ...word, lang } : null
  }

  async searchWords(lang: string, search: string): Promise<Omit<Word, 'groups'>[]> {
    return (
      await this.database.query<WordModel>(
        `
      SELECT * FROM words_${lang} WHERE word LIKE $1
    `,
        [`${search}%`]
      )
    ).map(w => ({ ...w, lang }))
  }

  async getWordsGroup({ skip, limit, groups }: GetWordsGroupOptions): Promise<{ id: number }[]> {
    const args: any[] = [skip, limit]
    const groupsExists = groups && groups.length
    groupsExists && args.push(`{${groups.toString()}}`)
    return this.database.query<{ id: number }>(
      `
      SELECT DISTINCT w.id
      FROM public.words_en w
      
      ${
        groupsExists
          ? `
            FULL JOIN word_groups_en g ON w.id = g.word_id
            WHERE group_id = ANY ($3::int[])
          `
          : ''
      }
      OFFSET $1
      LIMIT $2
    `,
      args
    )
  }

  async getAllWords({ paging, params, lang }: GetAllWordsArgs) {
    return (
      await this.database.query<WordModel>(
        `
      SELECT *
      FROM words_${lang}
      WHERE word LIKE $1
      lIMIT $2
      OFFSET $3;
    `,
        [`${params.search}%`, paging.limit, paging.skip]
      )
    ).map(w => ({ ...w, lang }))
  }

  async getAllWordsCount({ params, lang }: GetAllWordsCountArgs) {
    return await this.database.query<{ count: number }>(
      `
        SELECT COUNT(*)
        FROM words_${lang}
        WHERE word LIKE 's%'
      `,
      [`${params.search}%`]
    )[0]
  }
}

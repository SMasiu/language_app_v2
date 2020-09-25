import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/services/database.service';
import { WordArgs } from '../graphql/word.args';
import { WordModel } from '../types/word.types';
import { GroupsService } from 'src/modules/groups/services/groups.service';
import { Word } from '../graphql/word.type';

@Injectable()
export class WordsService {
  constructor(
    private database: DatabaseService,
    private groupService: GroupsService,
  ) {}

  async addWord({ word, lang }: WordArgs) {
    const dbWord = await this.checkIfWordExists(lang, word.word);

    if (dbWord) {
      await this.groupService.addGroupsToWord(lang, dbWord.id, word.groups);

      return {
        ...dbWord,
        lang,
      };
    }

    const newWord = (
      await this.database.query<WordModel>(
        `
        INSERT INTO words_${lang} (word) VALUES ($1) RETURNING *
      `,
        [word.word],
      )
    )[0];

    await this.groupService.addGroupsToWord(lang, newWord.id, word.groups);

    return {
      ...newWord,
      lang,
    };
  }

  async checkIfWordExists(
    lang: string,
    word: string,
  ): Promise<WordModel | undefined> {
    return (
      await this.database.query<WordModel>(
        `
      SELECT * FROM words_${lang} WHERE word = $1
    `,
        [word],
      )
    )[0];
  }

  async getWordById(
    lang: string,
    wordId: number,
  ): Promise<Omit<Word, 'groups'> | null> {
    const word =
      (
        await this.database.query<WordModel>(
          `
      SELECT * FROM words_${lang} WHERE id = $1
    `,
          [wordId],
        )
      )[0] || null;

    return word ? { ...word, lang } : null;
  }
}

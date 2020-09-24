import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/services/database.service';
import { WordArgs } from '../graphql/word.args';
import { WordModel } from '../types/word.types';

@Injectable()
export class WordsService {
  constructor(private database: DatabaseService) {}

  async addWord({ word, lang }: WordArgs) {
    const dbWord = await this.checkIfWordExists(lang, word.word);

    if (dbWord) {
      return {
        ...dbWord,
        lang,
      };
    }

    const newWord = await this.database.query<WordModel>(
      `
        INSERT INTO words_${lang} (word, group_1, group_2, group_3) VALUES ($1, $2, $3, $4) RETURNING *
      `,
      [word.word, word.group_1, word.group_2, word.group_3],
    );

    return {
      ...newWord[0],
      lang,
    };
  }

  async checkIfWordExists(lang: string, word: string): Promise<any> {
    return (
      await this.database.query<WordModel>(
        `
      SELECT * FROM words_${lang} WHERE word = $1
    `,
        [word],
      )
    )[0];
  }
}

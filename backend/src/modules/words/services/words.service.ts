import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/services/database.service';
import { WordArgs } from '../graphql/word.args';

@Injectable()
export class WordsService {
  constructor(private database: DatabaseService) {}

  async addWord({ word, lang }: WordArgs) {
    const newWord = await this.database.query<{ id: number; word: string }>(
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
}

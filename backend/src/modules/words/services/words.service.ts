import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/services/database.service';
import { WordArgs } from '../graphql/word.args';

@Injectable()
export class WordsService {
  constructor(private database: DatabaseService) {}

  async addWord({ word, lang }: WordArgs) {
    const newWord = await this.database.pool.query(`
        INSERT INTO words_${lang} (word) VALUES ('${word.word}') RETURNING id, word
      `);

    return {
      ...newWord.rows[0],
      lang,
    };
  }
}

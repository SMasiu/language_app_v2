import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/services/database.service';
import { WordsService } from 'src/modules/words/services/words.service';
import { CreateTestInput } from '../graphql/test.args';
import { TestModel } from '../types/test.types';

@Injectable()
export class TestsService {
  constructor(
    private database: DatabaseService,
    private wordsService: WordsService,
  ) {}

  async createTest(testParams: CreateTestInput) {
    console.log(testParams);

    const wordIds = await this.wordsService.getWordsGroup({ ...testParams });
    const wordIdsNumbers = wordIds.map(w => w.id);

    const savedTest = (
      await this.database.query<TestModel>(
        `
        INSERT INTO tests (lang_from, lang_to, words) VALUES ($1, $2, $3) RETURNING *
    `,
        [testParams.langFrom, testParams.langTo, wordIdsNumbers.toString()],
      )
    )[0];

    return {
      id: savedTest.id,
      langFrom: testParams.langFrom,
      langTo: testParams.langTo,
      words: wordIdsNumbers,
    };
  }
}

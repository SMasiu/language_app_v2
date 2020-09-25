import { Injectable } from '@nestjs/common';
import { TranslateArgs } from '../graphql/translate.args';
import { DatabaseService } from 'src/modules/database/services/database.service';
import { LanguageService } from 'src/modules/language/services/language.service';
import { WordModel } from 'src/modules/words/types/word.types';

@Injectable()
export class TranslateService {
  constructor(
    private database: DatabaseService,
    private languageService: LanguageService,
  ) {}

  async translateWord({ from, to, word }: TranslateArgs) {
    const translation = this.languageService.getTranslationPair(from, to);
    const originalFrom = from;
    const originalTo = to;

    if (translation[0] !== from) {
      from = to;
      to = originalFrom;
    }

    const words = await this.database.query<WordModel>(
      `
        SELECT w_${originalTo}.word, w_${originalTo}.id
        FROM translations_${from}_${to} tr
        JOIN words_${from} w_${from} ON w_${from}.id = tr.word_1_id
        JOIN words_${to} w_${to} ON w_${to}.id = tr.word_2_id
        WHERE w_${originalFrom}.word = $1
    `,
      [word],
    );

    return {
      word,
      wordTranslations: words.map(w => ({ ...w, lang: to })),
    };
  }
}

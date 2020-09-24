import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/services/database.service';
import { LanguageService } from 'src/modules/language/services/language.service';
import { TranslationsArgs } from '../graphql/translation.args';
import {
  TranslationModel,
  TranslationResponse,
} from '../types/translation.types';

@Injectable()
export class TranslationsService {
  constructor(
    private database: DatabaseService,
    private languageService: LanguageService,
  ) {}

  async addTranslation({
    from,
    to,
  }: TranslationsArgs): Promise<TranslationResponse> {
    const translation = this.languageService.getTranslationPair(
      from.lang,
      to.lang,
    );

    if (translation[0] !== from.lang) {
      let swap = { ...from };
      from = { ...to };
      to = { ...swap };
    }

    return this.mapModelToResponse(
      (
        await this.database.query<TranslationModel>(
          `
        INSERT INTO translations_${from.lang}_${to.lang} (word_1_id, word_2_id) VALUES ($1, $2) RETURNING *
    `,
          [from.wordId, to.wordId],
        )
      )[0],
      from.lang,
      to.lang,
    );
  }

  mapModelToResponse(
    model: TranslationModel,
    from: string,
    to: string,
  ): TranslationResponse {
    return {
      id: model.id,
      word1: {
        word: model.word_1_id,
        lang: from,
      },
      word2: {
        word: model.word_2_id,
        lang: to,
      },
    };
  }
}

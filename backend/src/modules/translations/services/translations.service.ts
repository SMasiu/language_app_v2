import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { DatabaseService } from 'src/modules/database/services/database.service'
import { LanguageService } from 'src/modules/language/services/language.service'
import {
  TranslationsArgs,
  GetTranslationByIdArgs,
  TranslationWordInput,
  DeleteTranslationArgs
} from '../graphql/translation.args'
import { TranslationModel, TranslationResponse } from '../types/translation.types'

@Injectable()
export class TranslationsService {
  constructor(private database: DatabaseService, private languageService: LanguageService) {}

  async addTranslation({ from, to }: TranslationsArgs): Promise<TranslationResponse> {
    const translation = this.languageService.getTranslationPair(from.lang, to.lang)

    if (translation[0] !== from.lang) {
      let swap = { ...from }
      from = { ...to }
      to = { ...swap }
    }

    const exists = await this.checkIfTranslationExists(from, to)

    if (exists) {
      throw new InternalServerErrorException('This translation alredy exist')
    }

    return this.mapModelToResponse(
      (
        await this.database.query<TranslationModel>(
          `
        INSERT INTO translations_${from.lang}_${to.lang} (word_1_id, word_2_id) VALUES ($1, $2) RETURNING *
    `,
          [from.wordId, to.wordId]
        )
      )[0],
      from.lang,
      to.lang
    )
  }

  async checkIfTranslationExists(from: TranslationWordInput, to: TranslationWordInput) {
    const translations = await this.database.query(
      `
      SELECT id FROM translations_${from.lang}_${to.lang} WHERE word_1_id = $1 AND word_2_id = $2
    `,
      [from.wordId, to.wordId]
    )

    return translations.length !== 0
  }

  async getTranslationById({ id, from, to }: GetTranslationByIdArgs): Promise<TranslationResponse> {
    const translation = this.languageService.getTranslationPair(from, to)

    if (translation[0] !== from) {
      let swap = from
      from = to
      to = swap
    }

    return this.mapModelToResponse(
      (
        await this.database.query<TranslationModel>(
          `
          SELECT * FROM translations_${from}_${to} WHERE id = $1
        `,
          [id]
        )
      )[0],
      from,
      to
    )
  }

  async deleteTranslation({ from, to }: DeleteTranslationArgs) {
    const translation = this.languageService.getTranslationPair(from.lang, to.lang)

    if (translation[0] !== from.lang) {
      let swap = from
      from = to
      to = swap
    }

    return this.mapModelToResponse(
      (
        await this.database.query<TranslationModel>(
          `
        DELETE FROM translations_${from.lang}_${to.lang}
        WHERE word_1_id = $1 AND word_2_id = $2
        RETURNING *
      `,
          [from.wordId, to.wordId]
        )
      )[0],
      from.lang,
      to.lang
    )
  }

  mapModelToResponse(
    model: TranslationModel,
    from: string,
    to: string
  ): TranslationResponse | null {
    if (!model) {
      return null
    }

    return {
      id: model.id,
      word1: {
        word: model.word_1_id,
        lang: from
      },
      word2: {
        word: model.word_2_id,
        lang: to
      }
    }
  }
}

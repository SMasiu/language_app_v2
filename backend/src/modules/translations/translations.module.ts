import { Module } from '@nestjs/common'
import { TranslationsResolver } from './resolvers/translations.resolver'
import { TranslationsService } from './services/translations.service'
import { DatabaseModule } from '../database/database.module'
import { LanguageModule } from '../language/language.module'
import { TranslationWordResolver } from './resolvers/translation-word.resolver'
import { WordsModule } from '../words/words.module'

@Module({
  providers: [TranslationsResolver, TranslationsService, TranslationWordResolver],
  imports: [DatabaseModule, LanguageModule, WordsModule]
})
export class TranslationsModule {}

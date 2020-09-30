import { Module } from '@nestjs/common'
import { TranslateResolver } from './resolvers/translate.resolver'
import { TranslateService } from './services/translate.service'
import { DatabaseModule } from '../database/database.module'
import { LanguageModule } from '../language/language.module'

@Module({
  providers: [TranslateResolver, TranslateService],
  imports: [DatabaseModule, LanguageModule]
})
export class TranslateModule {}

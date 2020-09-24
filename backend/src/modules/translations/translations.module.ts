import { Module } from '@nestjs/common';
import { TranslationsResolver } from './resolvers/translations.resolver';
import { TranslationsService } from './services/translations.service';
import { DatabaseModule } from '../database/database.module';
import { LanguageModule } from '../language/language.module';

@Module({
  providers: [TranslationsResolver, TranslationsService],
  imports: [DatabaseModule, LanguageModule],
})
export class TranslationsModule {}

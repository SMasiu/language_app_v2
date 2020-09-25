import { Module } from '@nestjs/common';
import { TranslateResolver } from './resolvers/translate.resolver';
import { TranslateService } from './services/translate.service';

@Module({
  providers: [TranslateResolver, TranslateService]
})
export class TranslateModule {}

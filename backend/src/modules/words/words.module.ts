import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WordsResolver } from './resolvers/words.resolver';
import { WordsService } from './services/words.service';

@Module({
  providers: [WordsResolver, WordsService],
  imports: [DatabaseModule],
  exports: [WordsService],
})
export class WordsModule {}

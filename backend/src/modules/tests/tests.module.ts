import { Module } from '@nestjs/common';
import { TestsResolver } from './resolvers/tests.resolver';
import { TestsService } from './services/tests.service';
import { DatabaseModule } from '../database/database.module';
import { WordsModule } from '../words/words.module';

@Module({
  providers: [TestsResolver, TestsService],
  imports: [DatabaseModule, WordsModule],
})
export class TestsModule {}

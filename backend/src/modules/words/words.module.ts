import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { WordsResolver } from './resolvers/words.resolver'
import { WordsService } from './services/words.service'
import { GroupsModule } from '../groups/groups.module'

@Module({
  providers: [WordsResolver, WordsService],
  imports: [DatabaseModule, GroupsModule],
  exports: [WordsService]
})
export class WordsModule {}

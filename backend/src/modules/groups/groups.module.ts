import { Module } from '@nestjs/common';
import { GroupsResolver } from './resolvers/groups.resolver';
import { GroupsService } from './services/groups.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [GroupsResolver, GroupsService],
  imports: [DatabaseModule],
  exports: [GroupsService],
})
export class GroupsModule {}

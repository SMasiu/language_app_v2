import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Group } from '../graphql/group.type';
import { GroupsService } from '../services/groups.service';
import { GroupArgs } from '../graphql/group.args';

@Resolver()
export class GroupsResolver {
  constructor(private groupService: GroupsService) {}

  @Mutation(() => Group)
  async addGroup(@Args() { group }: GroupArgs) {
    return await this.groupService.createGroup(group);
  }
}

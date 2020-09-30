import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { Group } from '../graphql/group.type'
import { GroupsService } from '../services/groups.service'
import { GroupArgs } from '../graphql/group.args'

@Resolver()
export class GroupsResolver {
  constructor(private groupService: GroupsService) {}

  @Mutation(() => Group)
  async addGroup(@Args() { group }: GroupArgs) {
    return await this.groupService.createGroup(group)
  }

  @Query(() => Group, { nullable: true })
  async getGroupById(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.groupService.getGroupById(id)
  }

  @Query(() => [Group])
  async getAllGroups() {
    return await this.groupService.getAllGroups()
  }
}

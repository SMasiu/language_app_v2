import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql'
import { Test } from '../graphql/test.type'
import { TestsService } from '../services/tests.service'
import { CreateTestArgs } from '../graphql/test.args'

@Resolver()
export class TestsResolver {
  constructor(private testsService: TestsService) {}

  @Mutation(() => Test)
  async createTest(@Args() { testParams }: CreateTestArgs) {
    return await this.testsService.createTest(testParams)
  }

  @Query(() => Test, { nullable: true })
  async getTestById(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.testsService.getTestById(id)
  }

  @Query(() => [Test])
  async getAllTests() {
    return await this.testsService.getAllTests()
  }
}

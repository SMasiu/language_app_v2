import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Test } from '../graphql/test.type';
import { TestsService } from '../services/tests.service';
import { CreateTestArgs } from '../graphql/test.args';

@Resolver()
export class TestsResolver {
  constructor(private testsService: TestsService) {}

  @Mutation(() => Test)
  async createTest(@Args() { testParams }: CreateTestArgs) {
    return await this.testsService.createTest(testParams);
  }
}

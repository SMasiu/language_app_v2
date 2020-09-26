import { Module } from '@nestjs/common';
import { TestsResolver } from './resolvers/tests.resolver';
import { TestsService } from './services/tests.service';

@Module({
  providers: [TestsResolver, TestsService]
})
export class TestsModule {}

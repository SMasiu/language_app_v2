import { Test, TestingModule } from '@nestjs/testing';
import { TranslateResolver } from './translate.resolver';

describe('TranslateResolver', () => {
  let resolver: TranslateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateResolver],
    }).compile();

    resolver = module.get<TranslateResolver>(TranslateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

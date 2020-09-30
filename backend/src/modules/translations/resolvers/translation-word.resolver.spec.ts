import { Test, TestingModule } from '@nestjs/testing'
import { TranslationWordResolver } from './translation-word.resolver'

describe('TranslationWordResolver', () => {
  let resolver: TranslationWordResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslationWordResolver]
    }).compile()

    resolver = module.get<TranslationWordResolver>(TranslationWordResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { TranslationsResolver } from './translations.resolver'

describe('TranslationsResolver', () => {
  let resolver: TranslationsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslationsResolver]
    }).compile()

    resolver = module.get<TranslationsResolver>(TranslationsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})

import { Resolver, Query, Args } from '@nestjs/graphql'
import { Translate } from '../graphql/translate.types'
import { TranslateArgs, TranslateByWordIdArgs } from '../graphql/translate.args'
import { TranslateService } from '../services/translate.service'

@Resolver()
export class TranslateResolver {
  constructor(private translateService: TranslateService) {}

  @Query(() => Translate)
  async translateWord(@Args() args: TranslateArgs) {
    return await this.translateService.translateWord(args)
  }

  @Query(() => Translate)
  async translateWordByWordId(@Args() args: TranslateByWordIdArgs) {
    return await this.translateService.translateByWordId(args)
  }
}

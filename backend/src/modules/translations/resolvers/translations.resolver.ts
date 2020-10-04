import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { Translation } from '../graphql/translation.type'
import {
  TranslationsArgs,
  GetTranslationByIdArgs,
  DeleteTranslationArgs
} from '../graphql/translation.args'
import { TranslationsService } from '../services/translations.service'

@Resolver(() => Translation)
export class TranslationsResolver {
  constructor(private translationService: TranslationsService) {}

  @Query(() => Translation, { nullable: true })
  async getTranslationById(@Args() args: GetTranslationByIdArgs) {
    return await this.translationService.getTranslationById(args)
  }

  @Mutation(() => Translation)
  async addTranslation(@Args() args: TranslationsArgs) {
    return await this.translationService.addTranslation(args)
  }

  @Mutation(() => Translation, { nullable: true })
  async deleteTranslation(@Args() args: DeleteTranslationArgs) {
    return await this.translationService.deleteTranslation(args)
  }
}

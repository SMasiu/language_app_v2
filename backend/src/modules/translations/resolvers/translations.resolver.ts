import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Translation } from '../graphql/translation.type';
import {
  TranslationsArgs,
  GetTranslationByIdArgs,
} from '../graphql/translation.args';
import { TranslationsService } from '../services/translations.service';

@Resolver(() => Translation)
export class TranslationsResolver {
  constructor(private translationService: TranslationsService) {}

  @Mutation(() => Translation)
  async addTranslation(@Args() args: TranslationsArgs) {
    return await this.translationService.addTranslation(args);
  }

  @Query(() => Translation)
  async getTranslationById(@Args() args: GetTranslationByIdArgs) {
    return await this.translationService.getTranslationById(args);
  }
}

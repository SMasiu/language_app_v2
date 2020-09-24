import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Translation } from '../graphql/translation.type';
import { TranslationsArgs } from '../graphql/translation.args';
import { TranslationsService } from '../services/translations.service';

@Resolver(() => Translation)
export class TranslationsResolver {
  constructor(private translationService: TranslationsService) {}

  @Mutation(() => Translation)
  async addTranslation(@Args() args: TranslationsArgs) {
    return await this.translationService.addTranslation(args);
  }
}

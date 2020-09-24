import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { WordArgs } from '../graphql/word.args';
import { Word } from '../graphql/word.type';
import { WordsService } from '../services/words.service';
import { WordModel } from '../types/word.types';

@Resolver(() => Word)
export class WordsResolver {
  constructor(private wordsService: WordsService) {}

  @Query(() => Word)
  getWordById(@Args('id') id: string) {}

  @Mutation(() => Word)
  async addWord(@Args() args: WordArgs) {
    return await this.wordsService.addWord(args);
  }

  @ResolveField('groups', () => [String])
  groups(@Parent() word: WordModel) {
    return [word.group_1, word.group_2, word.group_3].filter(g => g) || [];
  }
}

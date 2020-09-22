import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WordArgs } from '../graphql/word.args';
import { Word } from '../graphql/word.type';
import { WordsService } from '../services/words.service';

@Resolver()
export class WordsResolver {
  constructor(private wordsService: WordsService) {}

  @Query(() => Word)
  getWordById(@Args('id') id: string) {}

  @Mutation(() => Word)
  async addWord(@Args() args: WordArgs) {
    return await this.wordsService.addWord(args);
  }
}

import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import {
  WordArgs,
  SearchWordsArgs,
  GetWordByIdArgs,
} from '../graphql/word.args';
import { Word } from '../graphql/word.type';
import { WordsService } from '../services/words.service';
import { GroupsService } from 'src/modules/groups/services/groups.service';
import { Group } from 'src/modules/groups/graphql/group.type';

@Resolver(() => Word)
export class WordsResolver {
  constructor(
    private wordsService: WordsService,
    private groupService: GroupsService,
  ) {}

  @Query(() => Word, { nullable: true })
  async getWordById(@Args() { lang, id }: GetWordByIdArgs) {
    return await this.wordsService.getWordById(lang, id);
  }

  @Query(() => [Word])
  async searchWords(@Args() { lang, search }: SearchWordsArgs) {
    return await this.wordsService.searchWords(lang, search);
  }

  @Mutation(() => Word)
  async addWord(@Args() args: WordArgs) {
    return await this.wordsService.addWord(args);
  }

  @ResolveField('groups', () => [Group])
  async groups(@Parent() word: Word) {
    return await this.groupService.getGroupsByWordId(word.lang, word.id);
  }
}

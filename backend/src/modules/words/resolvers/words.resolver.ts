import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql'
import {
  WordArgs,
  SearchWordsArgs,
  GetWordByIdArgs,
  GetAllWordsArgs,
  GetAllWordsCountArgs,
  DeleteWordArgs,
  UpdateWordArgs
} from '../graphql/word.args'
import { Word } from '../graphql/word.type'
import { WordsService } from '../services/words.service'
import { GroupsService } from 'src/modules/groups/services/groups.service'
import { Group } from 'src/modules/groups/graphql/group.type'
import { CountType } from 'src/common/count.type'

@Resolver(() => Word)
export class WordsResolver {
  constructor(private wordsService: WordsService, private groupService: GroupsService) {}

  @Query(() => Word, { nullable: true })
  async getWordById(@Args() { lang, id }: GetWordByIdArgs) {
    return await this.wordsService.getWordById(lang, id)
  }

  @Query(() => [Word])
  async searchWords(@Args() { lang, search }: SearchWordsArgs) {
    return await this.wordsService.searchWords(lang, search)
  }

  @Query(() => [Word])
  async getAllWords(@Args() args: GetAllWordsArgs) {
    return await this.wordsService.getAllWords(args)
  }

  @Query(() => CountType)
  async getAllWordsCount(@Args() args: GetAllWordsCountArgs) {
    return await this.wordsService.getAllWordsCount(args)
  }

  @Mutation(() => Word)
  async addWord(@Args() args: WordArgs) {
    return await this.wordsService.addWord(args)
  }

  @Mutation(() => Word)
  async deleteWord(@Args() args: DeleteWordArgs) {
    return await this.wordsService.deleteWord(args)
  }

  @Mutation(() => Word)
  async updateWord(@Args() args: UpdateWordArgs) {
    return await this.wordsService.updateWord(args)
  }

  @ResolveField('groups', () => [Group])
  async groups(@Parent() word: Word) {
    return await this.groupService.getGroupsByWordId(word.lang, word.id)
  }
}

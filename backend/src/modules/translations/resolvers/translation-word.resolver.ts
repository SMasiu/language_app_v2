import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { TranslationWord } from '../graphql/translation.type';
import { Word } from 'src/modules/words/graphql/word.type';
import { TranslationWordResponse } from '../types/translation.types';
import { WordsService } from 'src/modules/words/services/words.service';

@Resolver(() => TranslationWord)
export class TranslationWordResolver {
  constructor(private wordsService: WordsService) {}

  @ResolveField('word', () => Word)
  async word(@Parent() { lang, word: wordId }: TranslationWordResponse) {
    const word = await this.wordsService.getWordById(lang, wordId);
    return {
      ...word,
      lang,
    };
  }
}

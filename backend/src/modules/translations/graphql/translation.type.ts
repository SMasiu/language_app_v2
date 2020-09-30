import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Word } from 'src/modules/words/graphql/word.type'

@ObjectType()
export class TranslationWord {
  @Field(() => Word)
  word: Word

  @Field(() => String)
  lang: string
}

@ObjectType()
export class Translation {
  @Field(() => Int)
  id: number

  @Field(() => TranslationWord)
  word1: TranslationWord

  @Field(() => TranslationWord)
  word2: TranslationWord
}

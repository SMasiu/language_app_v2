import { ObjectType, Field } from '@nestjs/graphql'
import { Word } from 'src/modules/words/graphql/word.type'

@ObjectType()
export class Translate {
  @Field(() => String)
  word: string

  @Field(() => [Word])
  wordTranslations: Word[]
}

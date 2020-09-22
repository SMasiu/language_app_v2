import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Word {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  lang: string;

  @Field(() => String)
  word: string;
}

import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Word {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  lang: string;

  @Field(() => String)
  word: string;

  @Field(() => [String])
  groups: string[];
}

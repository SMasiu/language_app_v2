import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Test {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  lang: string;

  @Field(() => Int)
  words: number[];
}

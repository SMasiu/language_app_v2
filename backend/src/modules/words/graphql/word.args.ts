import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@InputType()
export class WordInput {
  @Field(() => String)
  word: string;

  @Field(() => String, { nullable: true })
  group_1: string;

  @Field(() => String, { nullable: true })
  group_2: string;

  @Field(() => String, { nullable: true })
  group_3: string;
}

@ArgsType()
export class WordArgs {
  @Field(() => WordInput)
  @Type(() => WordInput)
  @ValidateNested({ each: true })
  word: WordInput;

  @Field(() => String)
  lang: string;
}

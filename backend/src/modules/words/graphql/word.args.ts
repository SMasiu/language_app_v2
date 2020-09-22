import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@InputType()
export class WordInput {
  @Field(() => String)
  word: string;
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

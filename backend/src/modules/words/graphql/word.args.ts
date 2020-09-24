import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsIn,
  MaxLength,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { availableLanguages } from 'src/modules/language/available-languages';

@InputType()
export class WordInput {
  @Field(() => String)
  @MaxLength(25)
  word: string;

  @Field(() => String, { nullable: true })
  @ValidateIf(o => o.group_1 !== null && o.group_1 !== undefined)
  @IsNotEmpty()
  @MaxLength(25)
  group_1: string;

  @Field(() => String, { nullable: true })
  @ValidateIf(o => o.group_2 !== null && o.group_2 !== undefined)
  @IsNotEmpty()
  @MaxLength(25)
  group_2: string;

  @Field(() => String, { nullable: true })
  @ValidateIf(o => o.group_3 !== null && o.group_3 !== undefined)
  @IsNotEmpty()
  @MaxLength(25)
  group_3: string;
}

@ArgsType()
export class WordArgs {
  @Field(() => WordInput)
  @Type(() => WordInput)
  @ValidateNested({ each: true })
  word: WordInput;

  @Field(() => String)
  @IsIn(availableLanguages)
  lang: string;
}

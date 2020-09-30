import { Field, ArgsType, Int } from '@nestjs/graphql';
import { availableLanguages } from 'src/modules/language/available-languages';
import { IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { trimToLowerCase } from 'src/common/transfrom';

@ArgsType()
export class TranslateArgs {
  @Field(() => String)
  @IsIn(availableLanguages)
  from: string;

  @Field(() => String)
  @IsIn(availableLanguages)
  to: string;

  @Field(() => String)
  @Transform(trimToLowerCase)
  word: string;
}

@ArgsType()
export class TranslateByWordIdArgs {
  @Field(() => String)
  @IsIn(availableLanguages)
  from: string;

  @Field(() => String)
  @IsIn(availableLanguages)
  to: string;

  @Field(() => Int)
  wordId: number;
}

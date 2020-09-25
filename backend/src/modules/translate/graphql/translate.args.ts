import { Field, ArgsType } from '@nestjs/graphql';
import { availableLanguages } from 'src/modules/language/available-languages';
import { IsIn } from 'class-validator';

@ArgsType()
export class TranslateArgs {
  @Field(() => String)
  @IsIn(availableLanguages)
  from: string;

  @Field(() => String)
  @IsIn(availableLanguages)
  to: string;

  @Field(() => String)
  word: string;
}

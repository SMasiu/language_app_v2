import { ArgsType, Field, Int, InputType } from '@nestjs/graphql'
import { IsIn, ValidateNested } from 'class-validator'
import { availableLanguages } from 'src/modules/language/available-languages'
import { Type } from 'class-transformer'

@InputType()
export class TranslationWordInput {
  @Field(() => Int)
  wordId: number

  @Field(() => String)
  @IsIn(availableLanguages)
  lang: string
}

@ArgsType()
export class TranslationsArgs {
  @Field(() => TranslationWordInput)
  @Type(() => TranslationWordInput)
  @ValidateNested({ each: true })
  from: TranslationWordInput

  @Field(() => TranslationWordInput)
  @Type(() => TranslationWordInput)
  @ValidateNested({ each: true })
  to: TranslationWordInput
}

@ArgsType()
export class GetTranslationByIdArgs {
  @Field(() => Int)
  id: number

  @Field(() => String)
  @IsIn(availableLanguages)
  from: string

  @Field(() => String)
  @IsIn(availableLanguages)
  to: string
}

@ArgsType()
export class DeleteTranslationArgs {
  @Field(() => TranslationWordInput)
  @Type(() => TranslationWordInput)
  @ValidateNested({ each: true })
  from: TranslationWordInput

  @Field(() => TranslationWordInput)
  @Type(() => TranslationWordInput)
  @ValidateNested({ each: true })
  to: TranslationWordInput
}

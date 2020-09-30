import { ArgsType, Field, InputType, Int } from '@nestjs/graphql'
import { Type, Transform } from 'class-transformer'
import {
  ValidateNested,
  IsIn,
  MaxLength,
  ValidateIf,
  IsNotEmpty,
  ArrayUnique
} from 'class-validator'
import { availableLanguages } from 'src/modules/language/available-languages'
import { trimToLowerCase } from 'src/common/transfrom'

@InputType()
export class WordInput {
  @Field(() => String)
  @MaxLength(25)
  @Transform(trimToLowerCase)
  word: string

  @Field(() => [Int], { nullable: true })
  @ValidateIf((o) => o.groups !== null && o.groups !== undefined)
  @IsNotEmpty({ each: true })
  @ArrayUnique()
  groups: number[]
}

@ArgsType()
export class WordArgs {
  @Field(() => WordInput)
  @Type(() => WordInput)
  @ValidateNested({ each: true })
  word: WordInput

  @Field(() => String)
  @IsIn(availableLanguages)
  lang: string
}

@ArgsType()
export class SearchWordsArgs {
  @Field(() => String)
  @IsIn(availableLanguages)
  lang: string

  @Field(() => String)
  search: string
}

@ArgsType()
export class GetWordByIdArgs {
  @Field(() => String)
  @IsIn(availableLanguages)
  lang: string

  @Field(() => Int)
  id: number
}

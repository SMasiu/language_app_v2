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
import { PagingArgs } from 'src/common/paging.args'

@InputType()
export class WordInput {
  @Field(() => String)
  @MaxLength(50)
  @Transform(trimToLowerCase)
  word: string

  @Field(() => [Int], { nullable: true })
  @ValidateIf(o => o.groups !== null && o.groups !== undefined)
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
export class UpdateWordArgs {
  @Field(() => String)
  @IsIn(availableLanguages)
  lang: string

  @Field(() => Int)
  id: number

  @Field(() => WordInput)
  @Type(() => WordInput)
  @ValidateNested({ each: true })
  newWord: WordInput
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

@InputType()
export class GetWordsParams {
  @Field(() => String)
  search: string
}

@ArgsType()
export class GetAllWordsArgs {
  @Field(() => PagingArgs)
  @Type(() => PagingArgs)
  @ValidateNested({ each: true })
  paging: PagingArgs

  @Field(() => GetWordsParams)
  @Type(() => GetWordsParams)
  @ValidateNested({ each: true })
  params: GetWordsParams

  @Field(() => String)
  @IsIn(availableLanguages)
  lang: string
}

@ArgsType()
export class GetAllWordsCountArgs {
  @Field(() => GetWordsParams)
  @Type(() => GetWordsParams)
  @ValidateNested({ each: true })
  params: GetWordsParams

  @Field(() => String)
  @IsIn(availableLanguages)
  lang: string
}

@ArgsType()
export class DeleteWordArgs {
  @Field(() => String)
  @IsIn(availableLanguages)
  lang: string

  @Field(() => Int)
  id: number
}

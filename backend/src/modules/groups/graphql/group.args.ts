import { InputType, Field, ArgsType } from '@nestjs/graphql'
import { Type, Transform } from 'class-transformer'
import { ValidateNested, MaxLength } from 'class-validator'
import { trimToLowerCase } from 'src/common/transfrom'

@InputType()
export class GroupInput {
  @Field(() => String)
  @Transform(trimToLowerCase)
  @MaxLength(25)
  name: string
}

@ArgsType()
export class GroupArgs {
  @Field(() => GroupInput)
  @Type(() => GroupInput)
  @ValidateNested({ each: true })
  group: GroupInput
}

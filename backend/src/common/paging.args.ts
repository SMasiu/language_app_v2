import { ArgsType, Field, Int, InputType } from '@nestjs/graphql'

@InputType()
export class PagingArgs {
  @Field(() => Int, { defaultValue: 0 })
  skip: number

  @Field(() => Int, { defaultValue: 25 })
  limit: number
}

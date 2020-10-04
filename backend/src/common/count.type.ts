import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class CountType {
  @Field(() => Int)
  count: number
}

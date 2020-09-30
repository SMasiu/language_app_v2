import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Test {
  @Field(() => Int)
  id: number

  @Field(() => String)
  langFrom: string

  @Field(() => String)
  langTo: string

  @Field(() => [Int])
  words: number[]
}

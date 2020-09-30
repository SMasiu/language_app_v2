import { Field, ID, ObjectType, Int } from '@nestjs/graphql'
import { Group } from 'src/modules/groups/graphql/group.type'

@ObjectType()
export class Word {
  @Field(() => Int)
  id: number

  @Field(() => String)
  lang: string

  @Field(() => String)
  word: string

  @Field(() => [Group])
  groups: Group[]
}

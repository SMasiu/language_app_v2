import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Group {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}

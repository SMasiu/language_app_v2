import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested, MaxLength } from 'class-validator';

@InputType()
export class GroupInput {
  @Field(() => String)
  @MaxLength(25)
  name: string;
}

@ArgsType()
export class GroupArgs {
  @Field(() => GroupInput)
  @Type(() => GroupInput)
  @ValidateNested({ each: true })
  group: GroupInput;
}

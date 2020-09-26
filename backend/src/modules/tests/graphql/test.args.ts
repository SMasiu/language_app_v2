import { InputType, ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested, IsIn, Min } from 'class-validator';
import { availableLanguages } from 'src/modules/language/available-languages';

@InputType()
export class CreateTestInput {
  @Field(() => [Int], { defaultValue: null })
  groups: number[];

  @Field(() => Int, { defaultValue: 25 })
  @Min(10)
  limit: number;

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;

  @Field(() => String)
  @IsIn(availableLanguages)
  langFrom: string;

  @Field(() => String)
  @IsIn(availableLanguages)
  langTo: string;
}

@ArgsType()
export class CreateTestArgs {
  @Field(() => CreateTestInput)
  @Type(() => CreateTestInput)
  @ValidateNested({ each: true })
  testParams: CreateTestInput;
}

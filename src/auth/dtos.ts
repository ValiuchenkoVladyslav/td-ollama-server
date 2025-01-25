import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class AuthDto {
  @Field(() => String, { description: 'User email' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'User password' })
  @MinLength(8)
  password: string;
}

@ObjectType()
export class TokensDto {
  @Field(() => String, { description: 'JWT Acess token' })
  access_token: string;

  @Field(() => String, { description: 'JWT Refresh token' })
  refresh_token: string;
}

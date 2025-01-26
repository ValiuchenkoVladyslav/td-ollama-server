import {
  Field,
  PickType,
  InputType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { User } from '@prisma/client';
import { BotPresetEntity, UserEntity } from './entities';

@ObjectType()
export class UserDto extends OmitType(UserEntity, [
  'hash',
  'hashedRt',
] as const) {}

@InputType()
export class ChangePasswordDto {
  @Field(() => String, { description: 'New password for the user' })
  @MinLength(8)
  password: string;
}

@InputType()
export class ChangeEmailDto implements Pick<User, 'email'> {
  @Field(() => String, { description: 'New email for the user' })
  @IsEmail()
  email: string;
}

@InputType()
export class CreateBotPresetDto extends PickType(
  BotPresetEntity,
  ['systemPrompt', 'type', 'token', 'allowedIds', 'model'] as const,
  InputType,
) {}

@InputType()
export class UpdateBotPresetDto extends PickType(
  BotPresetEntity,
  ['systemPrompt', 'type', 'token', 'allowedIds', 'model'] as const,
  InputType,
) {}

import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { BotPreset, User } from '@prisma/client';
import { IsIn, MinLength } from 'class-validator';

@ObjectType()
export class UserEntity implements User {
  @Field(() => ID, { description: 'User id' })
  id: number;

  @Field(() => GraphQLISODateTime, { description: 'Updated at' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'Updated at' })
  updatedAt: Date;

  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'Hashed password' })
  hash: string;

  @Field(() => String, { description: 'Hashed refresh token' })
  hashedRt: string;
}

export enum BotType {
  Telegram = 0,
  Discord = 1,
}

@ObjectType()
export class BotPresetEntity implements BotPreset {
  @Field(() => ID, { description: 'Preset id' })
  id: number;

  @Field(() => GraphQLISODateTime, { description: 'Created at' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'Updated at' })
  updatedAt: Date;

  @Field(() => ID, { description: 'Preset owner id' })
  userId: number;

  @Field(() => String, { description: 'System prompt for the bot' })
  @MinLength(1)
  systemPrompt: string;

  @Field(() => Int, { description: 'Bot type (Telegram or Discord)' })
  @IsIn(Object.values(BotType))
  type: BotType;

  @Field(() => String, { description: 'Bot token' })
  @MinLength(1)
  token: string;

  @Field(() => String, { nullable: true, description: 'Allowed IDs' })
  allowedIds: string | null;

  @Field(() => String, { description: 'Model name for the bot' })
  @MinLength(1)
  model: string;
}

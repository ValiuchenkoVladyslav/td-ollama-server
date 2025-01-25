import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsIn, MinLength } from 'class-validator';
import { BotPreset } from '@prisma/client';

export class ChangePasswordDto {
  @ApiProperty({ description: 'New password for the user' })
  @MinLength(8)
  password: string;
}

export class ChangeEmailDto {
  @ApiProperty({ description: 'New email for the user' })
  @IsEmail()
  email: string;
}

export enum BotType {
  Telegram = 0,
  Discord = 1,
}

export class BotPresetDto implements BotPreset {
  @ApiProperty({ description: 'Preset id' })
  id: number;

  @ApiProperty({ description: 'Created at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at' })
  updatedAt: Date;

  @ApiProperty({ description: 'Preset owner id' })
  userId: number;

  @ApiProperty({ description: 'System prompt for the bot' })
  @MinLength(1)
  systemPrompt: string;

  @ApiProperty({ description: 'Bot type (Telegram or Discord)' })
  @IsIn(Object.values(BotType))
  type: BotType;

  @ApiProperty({ description: 'Bot token' })
  @MinLength(1)
  token: string;

  @ApiProperty({ description: 'Allowed IDs' })
  allowedIds: string | null;

  @ApiProperty({ description: 'Model name for the bot' })
  @MinLength(1)
  model: string;
}

export class CreateBotPresetDto extends PickType(BotPresetDto, [
  'systemPrompt',
  'type',
  'token',
  'allowedIds',
  'model',
] as const) {}

export class UpdateBotPresetDto extends PickType(BotPresetDto, [
  'systemPrompt',
  'type',
  'token',
  'allowedIds',
  'model',
] as const) {}

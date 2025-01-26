import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { UserService, PresetsService } from './user.service';
import { GetUid } from '~/common/decorators';
import {
  ChangeEmailDto,
  ChangePasswordDto,
  CreateBotPresetDto,
  UpdateBotPresetDto,
  UserDto,
} from './dtos';
import { BotPresetEntity } from './entities';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from '~/common/guards';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AtGuard)
  @Query(() => String, { description: '[Requires Auth] Get full user info' })
  async getMe(@GetUid() userId: number): Promise<UserDto> {
    return this.userService.getMe(userId);
  }

  @UseGuards(AtGuard)
  @Mutation(() => Boolean, { description: '[Requires Auth] Change user email' })
  async changeEmail(
    @GetUid() userId: number,
    @Args('data') changeEmailInput: ChangeEmailDto,
  ): Promise<boolean> {
    await this.userService.changeEmail(userId, changeEmailInput);
    return true;
  }

  @UseGuards(AtGuard)
  @Mutation(() => Boolean, {
    description: '[Requires Auth] Change user password',
  })
  async changePassword(
    @GetUid() userId: number,
    @Args('data') changePasswordInput: ChangePasswordDto,
  ): Promise<boolean> {
    await this.userService.changePassword(userId, changePasswordInput);
    return true;
  }

  @UseGuards(AtGuard)
  @Mutation(() => Boolean, {
    description: '[Requires Auth] Delete user account',
  })
  async deleteAccount(@GetUid() userId: number): Promise<boolean> {
    await this.userService.delete(userId);
    return true;
  }
}

@Resolver()
export class PresetsResolver {
  constructor(private readonly presetsService: PresetsService) {}

  @UseGuards(AtGuard)
  @Mutation(() => BotPresetEntity, {
    description: '[Requires Auth] Create new bot preset',
  })
  async createPreset(
    @GetUid() userId: number,
    @Args('data') createBotPresetDto: CreateBotPresetDto,
  ): Promise<BotPresetEntity> {
    return this.presetsService.create(userId, createBotPresetDto);
  }

  @UseGuards(AtGuard)
  @Query(() => [BotPresetEntity], {
    description: '[Requires Auth] Get all bot presets',
  })
  async fetchPresets(@GetUid() userId: number): Promise<BotPresetEntity[]> {
    return this.presetsService.findAll(userId);
  }

  @UseGuards(AtGuard)
  @Mutation(() => BotPresetEntity, {
    description: '[Requires Auth] Update bot preset by ID',
  })
  async updatePreset(
    @GetUid() userId: number,
    @Args('id', { type: () => Int }) id: number,
    @Args('data') updateBotPresetDto: UpdateBotPresetDto,
  ): Promise<BotPresetEntity> {
    return this.presetsService.update(userId, id, updateBotPresetDto);
  }

  @UseGuards(AtGuard)
  @Mutation(() => Boolean, {
    description: '[Requires Auth] Delete bot preset by ID',
  })
  async removePreset(
    @GetUid() userId: number,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.presetsService.delete(userId, id);
    return true;
  }
}

import {
  Controller,
  Body,
  Patch,
  Get,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { UserService, PresetsService } from './users.service';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChangeEmailDto, ChangePasswordDto } from './dtos';
import { GetCurrentUserId } from '~/common/decorators';
import { CreateBotPresetDto, UpdateBotPresetDto, BotPresetDto } from './dtos';

@ApiBearerAuth()
@Controller('@me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('email')
  @ApiOperation({ summary: 'Change user email' })
  async changeEmail(
    @GetCurrentUserId() userId: number,
    @Body() changeEmailDto: ChangeEmailDto,
  ) {
    await this.userService.changeEmail(userId, changeEmailDto);
  }

  @Patch('password')
  @ApiOperation({ summary: 'Change user password' })
  async changePassword(
    @GetCurrentUserId() userId: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.userService.changePassword(userId, changePasswordDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user account' })
  async delete(@GetCurrentUserId() userId: number) {
    await this.userService.delete(userId);
  }
}

@ApiBearerAuth()
@ApiTags('Bot presets')
@Controller('presets')
export class PresetsController {
  constructor(private readonly presetsService: PresetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bot preset' })
  @ApiOkResponse({ type: BotPresetDto })
  async create(
    @GetCurrentUserId() userId: number,
    @Body() createBotPresetDto: CreateBotPresetDto,
  ): Promise<BotPresetDto> {
    return this.presetsService.create(userId, createBotPresetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bot presets' })
  @ApiOkResponse({ type: BotPresetDto, isArray: true })
  async findAll(@GetCurrentUserId() userId: number): Promise<BotPresetDto[]> {
    return this.presetsService.findAll(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a bot preset by ID' })
  @ApiOkResponse({ type: BotPresetDto })
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id') id: string,
    @Body() updateBotPresetDto: UpdateBotPresetDto,
  ): Promise<BotPresetDto> {
    return this.presetsService.update(userId, +id, updateBotPresetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bot preset by ID' })
  async remove(@GetCurrentUserId() userId: number, @Param('id') id: string) {
    await this.presetsService.delete(userId, +id);
  }
}

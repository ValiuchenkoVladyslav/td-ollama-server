import { Controller, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChangeEmailDto, ChangePasswordDto } from './dtos';
import { GetCurrentUserId } from '~/common/decorators';

@ApiBearerAuth()
@Controller('@me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('email')
  @ApiOperation({ summary: 'Change user email' })
  async changeEmail(
    @GetCurrentUserId() userId: number,
    @Body() changeEmailDto: ChangeEmailDto,
  ) {
    await this.usersService.changeEmail(userId, changeEmailDto);
  }

  @Patch('password')
  @ApiOperation({ summary: 'Change user password' })
  async changePassword(
    @GetCurrentUserId() userId: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.usersService.changePassword(userId, changePasswordDto);
  }
}

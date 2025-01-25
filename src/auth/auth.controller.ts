import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Public, GetCurrentUserId, GetCurrentUser } from '~/common/decorators';
import { RtGuard } from '~/common/guards';
import { AuthService } from './auth.service';
import { AuthDto, TokensDto } from './dtos';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiCreatedResponse({ type: TokensDto })
  signupLocal(@Body() dto: AuthDto): Promise<TokensDto> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('signin')
  @ApiOperation({ summary: 'User signin' })
  @ApiOkResponse({ type: TokensDto })
  signinLocal(@Body() dto: AuthDto): Promise<TokensDto> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User logout' })
  @ApiBearerAuth()
  async logout(@GetCurrentUserId() userId: number) {
    await this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: TokensDto })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TokensDto> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

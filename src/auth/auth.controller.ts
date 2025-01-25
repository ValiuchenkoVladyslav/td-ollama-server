import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  Public,
  GetCurrentUserId,
  GetCurrentUser,
} from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto, TokensDto } from './dtos';
import { ApiCreatedResponse, ApiHeader, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiCreatedResponse({ type: TokensDto })
  signupLocal(@Body() dto: AuthDto): Promise<TokensDto> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('signin')
  @ApiOkResponse({ type: TokensDto })
  signinLocal(@Body() dto: AuthDto): Promise<TokensDto> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Access token',
  })
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Refresh token',
  })
  @ApiOkResponse({ type: TokensDto })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TokensDto> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

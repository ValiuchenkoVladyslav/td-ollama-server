import { UseGuards } from '@nestjs/common';
import { GetUid, GetCurrentUser } from '~/common/decorators';
import { AtGuard, RtGuard } from '~/common/guards';
import { AuthService } from './auth.service';
import { AuthDto, TokensDto } from './dtos';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtPayloadWithRt } from './types';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => TokensDto, { description: 'Create new user' })
  signupLocal(@Args('data') dto: AuthDto): Promise<TokensDto> {
    return this.authService.signupLocal(dto);
  }

  @Mutation(() => TokensDto, { description: 'Sign in user' })
  signinLocal(@Args('data') dto: AuthDto): Promise<TokensDto> {
    return this.authService.signinLocal(dto);
  }

  @UseGuards(AtGuard)
  @Mutation(() => Boolean, { description: '[Requires Auth] User logout' })
  async logout(@GetUid() userId: number): Promise<boolean> {
    await this.authService.logout(userId);

    return true;
  }

  @UseGuards(RtGuard)
  @Mutation(() => TokensDto, { description: '[Requires Auth] Refresh tokens' })
  refreshTokens(
    @GetUid() userId: number,
    @GetCurrentUser() user: JwtPayloadWithRt,
  ): Promise<TokensDto> {
    return this.authService.refreshTokens(userId, user);
  }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AtStrategy, RtStrategy, AuthResolver],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '~/prisma/prisma.module';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  providers: [AuthService, AtStrategy, RtStrategy, AuthResolver],
})
export class AuthModule {}

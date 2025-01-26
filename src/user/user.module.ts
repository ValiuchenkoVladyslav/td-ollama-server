import { Module } from '@nestjs/common';
import { UserService, PresetsService } from './user.service';
import { UserResolver, PresetsResolver } from './user.resolver';
import { PrismaModule } from '~/prisma/prisma.module';

@Module({
  providers: [UserResolver, PresetsResolver, UserService, PresetsService],
  imports: [PrismaModule],
})
export class UserModule {}

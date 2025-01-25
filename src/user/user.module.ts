import { Module } from '@nestjs/common';
import { UserService, PresetsService } from './user.service';
import { UserResolver, PresetsResolver } from './user.resolver';

@Module({
  providers: [UserResolver, PresetsResolver, UserService, PresetsService],
})
export class UserModule {}

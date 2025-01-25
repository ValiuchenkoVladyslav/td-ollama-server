import { Module } from '@nestjs/common';
import { UserService, PresetsService } from './users.service';
import { UserController, PresetsController } from './users.controller';

@Module({
  controllers: [UserController, PresetsController],
  providers: [UserService, PresetsService],
})
export class UsersModule {}

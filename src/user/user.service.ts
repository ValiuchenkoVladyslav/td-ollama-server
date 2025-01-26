import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import {
  ChangeEmailDto,
  ChangePasswordDto,
  CreateBotPresetDto,
  UpdateBotPresetDto,
  UserDto,
} from './dtos';
import * as argon2 from 'argon2';
import { BotPresetEntity } from './entities';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      omit: {
        hash: true,
        hashedRt: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async changeEmail(userId: number, changeEmailDto: ChangeEmailDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: changeEmailDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { email: changeEmailDto.email },
    });
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const hashedPassword = await argon2.hash(changePasswordDto.password);

    await this.prisma.user.update({
      where: { id: userId },
      data: { hash: hashedPassword },
    });
  }

  async delete(userId: number) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}

@Injectable()
export class PresetsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createBotPresetDto: CreateBotPresetDto,
  ): Promise<BotPresetEntity> {
    return this.prisma.botPreset.create({
      data: {
        ...createBotPresetDto,
        userId,
      },
    });
  }

  async findAll(userId: number): Promise<BotPresetEntity[]> {
    return this.prisma.botPreset.findMany({
      where: { userId },
    });
  }

  async update(
    userId: number,
    id: number,
    updateBotPresetDto: UpdateBotPresetDto,
  ): Promise<BotPresetEntity> {
    return this.prisma.botPreset.update({
      where: { id, userId },
      data: updateBotPresetDto,
    });
  }

  async delete(userId: number, id: number) {
    await this.prisma.botPreset.delete({
      where: { id, userId },
    });
  }
}

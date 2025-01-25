import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { ChangeEmailDto, ChangePasswordDto } from './dtos';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
}

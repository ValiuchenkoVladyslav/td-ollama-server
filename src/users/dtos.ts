import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ description: 'New password for the user' })
  @MinLength(8)
  password: string;
}

export class ChangeEmailDto {
  @ApiProperty({ description: 'New email for the user' })
  @IsEmail()
  email: string;
}

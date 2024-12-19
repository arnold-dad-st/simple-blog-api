import { IsEmail, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: 'Unique identifier of the user' })
  @IsUUID()
  id: string;

  created_at: Date;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  username: string;
}

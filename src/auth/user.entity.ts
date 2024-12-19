import { IsEmail, IsString, IsUUID } from 'class-validator';

export class User {
  @IsUUID()
  id: string;

  created_at: Date;

  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;
}

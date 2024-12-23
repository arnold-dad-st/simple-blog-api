import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse } from './dto/user-response';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('api/users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Retrieve all users with limited information' })
  @Get()
  async getAllUsers(): Promise<UserResponse[]> {
    return await this.usersService.findAll();
  }
}

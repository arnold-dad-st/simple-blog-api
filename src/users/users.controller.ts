import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse } from './dto/user-response';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../middleware/guard/auth.guard';

@ApiTags('api/users')
@Controller('api/users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Retrieve all users with limited information' })
  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(): Promise<UserResponse[]> {
    return await this.usersService.findAll();
  }
}

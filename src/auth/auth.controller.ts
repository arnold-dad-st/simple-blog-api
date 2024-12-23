import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponse } from './dto/user-response';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('api/auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterUserDto })
  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserResponse> {
    const { email, password, firstName, lastName, username } = registerUserDto;

    // Register the user with Supabase
    const {
      data: { user },
      error: authError,
    } = await this.supabaseService.supabase.auth.signUp({ email, password });

    if (authError) throw new BadRequestException(authError.message);

    // Insert user profile to the profiles table
    const { data: profile, error: profileError } =
      await this.supabaseService.supabase
        .from('profiles')
        .insert({
          id: user.id, // Link to the created user in the auth table
          firstName,
          lastName,
          username,
          email,
        })
        .select()
        .single();

    if (profileError) throw new BadRequestException(profileError.message);

    // Return user details
    return {
      id: profile.id,
      created_at: profile.created_at,
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      email: profile.email,
    };
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const {
      data: { session },
      error: authError,
    } = await this.supabaseService.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw new UnauthorizedException(authError.message);

    // Get user profile from the profiles table using the user's ID
    const { data: profile, error: profileError } =
      await this.supabaseService.supabase
        .from('profiles')
        .select('id, firstName, lastName, username, email')
        .eq('id', session.user.id)
        .single();

    if (profileError) throw new UnauthorizedException(profileError.message);

    return {
      accessToken: session.access_token,
      user: {
        id: session.user.id,
        email: session.user.email,
        username: profile.username, // Get the username from the profile
        firstName: profile.firstName, // Get the first name from the profile
        lastName: profile.lastName, // Get the last name from the profile
      },
    };
  }
}

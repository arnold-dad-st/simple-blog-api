import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UserResponse } from './dto/user-response';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<UserResponse[]> {
    // Query profiles table for user information
    const { data, error } = await this.supabaseService.supabase
      .from('profiles')
      .select('id, created_at, firstName, lastName, username, email, avatar');

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return data as UserResponse[];
  }
}

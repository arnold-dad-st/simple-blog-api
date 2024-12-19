import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('post_SUPABASE_URL'),
      this.configService.get<string>('post_NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    );
  }
}

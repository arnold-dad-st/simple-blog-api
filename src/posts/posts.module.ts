import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SupabaseService } from '../supabase.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PostsController],
  providers: [PostsService, ConfigService, SupabaseService],
})
export class PostsModule {}

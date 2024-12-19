import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { SupabaseService } from '../supabase.service';

@Injectable()
export class PostsService {
  constructor(private supabaseService: SupabaseService) {}

  async create(post: Partial<Post>): Promise<Post> {
    const { data, error } = await this.supabaseService.supabase
      .from('posts')
      .insert(post)
      .select()
      .single();
    if (error) throw new Error(`Error creating post: ${error.message}`);
    return data as Post;
  }

  async findAll(): Promise<Post[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('posts')
      .select('*');
    if (error) throw new Error(`Error retrieving posts: ${error.message}`);
    return data as Post[];
  }

  async findOne(id: string): Promise<Post> {
    const { data, error } = await this.supabaseService.supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new NotFoundException(`Post with ID "${id}" not found.`);
    return data as Post;
  }

  async update(id: string, updatePostDto: Partial<Post>): Promise<Post> {
    const { data, error } = await this.supabaseService.supabase
      .from('posts')
      .update(updatePostDto)
      .eq('id', id)
      .select()
      .single();
    if (error)
      throw new NotFoundException(
        `Error updating post with ID "${id}": ${error.message}`,
      );
    return data as Post;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabaseService.supabase
      .from('posts')
      .delete()
      .eq('id', id);
    if (error)
      throw new NotFoundException(
        `Error deleting post with ID "${id}": ${error.message}`,
      );
  }
}

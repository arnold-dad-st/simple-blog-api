import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  create(post: Partial<Post>): Post {
    const newPost = { id: uuid(), ...post } as Post;
    this.posts.push(newPost);
    return newPost;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`Post with ID "${id}" not found.`);
    return post;
  }

  update(id: string, updatePostDto: Partial<Post>): Post {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1)
      throw new NotFoundException(`Post with ID "${id}" not found.`);
    this.posts[postIndex] = { ...this.posts[postIndex], ...updatePostDto };
    return this.posts[postIndex];
  }

  delete(id: string): void {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1)
      throw new NotFoundException(`Post with ID "${id}" not found.`);
    this.posts.splice(postIndex, 1);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { v4 as uuid } from 'uuid';

const posts: Post[] = [];

@Injectable()
export class PostsService {
  create(post: Partial<Post>): Post {
    const newPost = { id: uuid(), ...post } as Post;
    posts.push(newPost);
    return newPost;
  }

  findAll(): Post[] {
    return posts;
  }

  findOne(id: string): Post {
    const post = posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`Post with ID "${id}" not found.`);
    return post;
  }

  update(id: string, updatePostDto: Partial<Post>): Post {
    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex === -1)
      throw new NotFoundException(`Post with ID "${id}" not found.`);
    posts[postIndex] = { ...posts[postIndex], ...updatePostDto };
    return posts[postIndex];
  }

  delete(id: string): void {
    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex === -1)
      throw new NotFoundException(`Post with ID "${id}" not found.`);
    posts.splice(postIndex, 1);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Post as BlogPost } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  @Post()
  create(@Body() createPostDto: CreatePostDto): BlogPost {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @Get()
  findAll(): BlogPost[] {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Get post by ID' })
  @Get(':id')
  findOne(@Param('id') id: string): BlogPost {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiBody({ type: UpdatePostDto })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): BlogPost {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete a post by ID' })
  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.postsService.delete(id);
  }
}

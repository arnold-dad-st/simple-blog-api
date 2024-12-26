import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Post as BlogPost } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../middleware/guard/auth.guard';

@ApiTags('api/posts')
@ApiBearerAuth('access-token')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreatePostDto })
  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<BlogPost> {
    return await this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @Get()
  async findAll(): Promise<BlogPost[]> {
    return await this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Get post by ID' })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPost> {
    return await this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiBody({ type: UpdatePostDto })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<BlogPost> {
    return await this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete a post by ID' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.postsService.delete(id);
  }
}

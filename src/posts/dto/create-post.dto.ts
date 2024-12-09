import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Story content of the post' })
  @IsString()
  @IsNotEmpty()
  story: string;

  @ApiProperty({ description: 'Author of the post' })
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiProperty({ description: 'Image URL for the post' })
  @IsString()
  @IsNotEmpty()
  img: string;
}

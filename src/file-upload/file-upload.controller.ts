import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { diskStorage } from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../middleware/guard/auth.guard';

@ApiTags('api/file-upload')
@Controller('api/file-upload')
@ApiBearerAuth('access-token')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload an image file' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @ApiBody({
    description: 'Upload an image file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Optional: temporary local storage
        filename: (req, file, callback) => {
          const fileExt = file.mimetype.split('/')[1];
          const fileName = `${Date.now()}.${fileExt}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          console.log(file.mimetype);
          callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      console.error('File is not uploaded');
      throw new BadRequestException('File is not uploaded');
    }
    return this.fileUploadService.uploadToSupabase(file);
  }
}

import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [],
  controllers: [FileUploadController],
  providers: [FileUploadService, SupabaseService],
})
export class FileUploadModule {}

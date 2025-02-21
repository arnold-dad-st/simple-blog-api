import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly configService: ConfigService,
  ) {}

  async uploadToSupabase(file: any): Promise<any> {
    try {
      const bucketName = 'images';
      const filePath = `${Date.now()}-${file.originalname}`;

      const { data, error } = await this.supabaseService.supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        console.error('Error uploading bucket-name:', bucketName);
        console.error('Error uploading file:', error);
        throw new InternalServerErrorException(
          `Error uploading file: ${error.message}`,
        );
      }

      const {
        data: { publicUrl },
      } = this.supabaseService.supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return { url: publicUrl, data };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}

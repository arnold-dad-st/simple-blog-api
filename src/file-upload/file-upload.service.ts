import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly configService: ConfigService,
  ) {}

  async uploadToSupabase(file: Express.Multer.File): Promise<any> {
    try {
      const bucketName = this.configService.get<string>('SUPABASE_BUCKET_NAME');
      const filePath = `${Date.now()}-${file.originalname}`;

      const { data, error } = await this.supabaseService.supabase.storage
        .from('images')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        console.log(error);
        console.log('Error uploading bucket-name:', bucketName);
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

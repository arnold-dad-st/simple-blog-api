import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async uploadToSupabase(file: Express.Multer.File): Promise<any> {
    try {
      const bucketName = process.env.SUPABASE_BUCKET_NAME;
      const filePath = `${Date.now()}-${file.originalname}`;

      const { data, error } = await this.supabaseService.supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        console.log(error);
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

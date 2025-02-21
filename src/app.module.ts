import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    FileUploadModule,
    UsersModule,
    AuthModule,
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

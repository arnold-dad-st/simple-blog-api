import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API for managing blog posts')
    .setVersion('1.0')
    .addTag('posts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  SwaggerModule.setup('api', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js',
    ],
  });

  app.enableCors();
  await app.listen(3000);
  console.log('Application is running on http://localhost:3000/api');
}
bootstrap();

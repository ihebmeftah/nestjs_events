import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder() //1
    .setTitle("Events API")
    .setDescription("This is an API for managing events")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config); //2
  SwaggerModule.setup("api", app, document); //3
  await app.listen(3000);
}
bootstrap();

      
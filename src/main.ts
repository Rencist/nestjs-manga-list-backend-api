import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MANGA')
    .setDescription('Manga List 2023')
    .setVersion('1.0')
    .addTag('MANGA')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      validationError: {
        target: false,
        value: false,
      },
      stopAtFirstError: true,
    }),
  );
  app.enableCors({
    origin:
      /^((http|https):\/\/([a-z0-9]+[.])*(inilhoits\.com|localhost|127\.0\.0\.1|inilho\.its\.ac\.id)(.*))$/i, // Regex for both protocol (http and https) and accept all connection from every port, every subdir, every subdomain inside localhost, inilhoits.com, inilho.its.ac.id, and 127.0.0.1
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './utils/env';
import { ValidationPipe } from '@nestjs/common';
import { initSwagger } from './docs/swagger';

const PORT = ENV.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await initSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  console.log(`Application is listening on port ${PORT}`);
  await app.listen(PORT);
}
bootstrap();

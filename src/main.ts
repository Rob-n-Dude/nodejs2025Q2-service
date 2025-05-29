import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './utils/env';

const PORT = ENV.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();

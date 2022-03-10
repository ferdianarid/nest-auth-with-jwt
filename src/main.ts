import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const NestApp = await NestFactory.create<NestExpressApplication>(AppModule);
  await NestApp.listen(3000);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser"
import { CLIENT_URL, PORT } from './config';

async function bootstrap() {
  const NestApp = await NestFactory.create<NestExpressApplication>(AppModule);

  NestApp.use(cookieParser())

  NestApp.enableCors({
    origin: CLIENT_URL,
    credentials: true
  })

  await NestApp.listen(PORT);
}

bootstrap();

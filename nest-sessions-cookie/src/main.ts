import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cookieParser from 'cookie-parser';
import { COOKIE_SECRET_KEY } from './consts';
import session from 'express-session';

const getSeconds = (s) => s * 1000;
const getMinutes = (m) => getSeconds(m * 60);
const getHours = (h) => getMinutes(h * 60);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();

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

  app.setGlobalPrefix('api');
  // app.use(cookieParser(COOKIE_SECRET_KEY));

  app.use(
    session({
      // store by default is memory cache. not for production
      // cuz it is not scalable
      secret: COOKIE_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      name: 'sessionIdNestCookie', // remove nest for prod
      cookie: {
        secure: false, // true for prod with https
        httpOnly: true, // every time is true
        maxAge: getSeconds(30),
        sameSite: 'lax',
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

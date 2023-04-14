import {
  Controller,
  Get,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  Req,
  Res,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { REDIS_INJECT_KEY, RedisModule } from './redis/redis.module';
import { RedisClient } from 'redis';
import * as session from 'express-session';
import * as RedisStore from 'connect-redis';
import * as passport from 'passport';
import { APP_GUARD } from '@nestjs/core';
import { LoggedInGuard } from './auth/guards/logged-in.guard';
import { AppController } from './app.controller';

const getSeconds = (s) => s * 1000;
const getMinutes = (m) => getSeconds(m * 60);

@Module({
  imports: [AuthModule, UsersModule, RedisModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LoggedInGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS_INJECT_KEY) private readonly redisClient: RedisClient,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const store = new (RedisStore(session))({
      client: this.redisClient,
      logErrors: true,
    });

    consumer
      .apply(
        session({
          store,
          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,

          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: getSeconds(10),
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}

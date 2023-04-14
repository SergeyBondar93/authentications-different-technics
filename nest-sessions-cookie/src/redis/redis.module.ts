import { Module } from '@nestjs/common';
import * as redis from 'redis';
export const REDIS_INJECT_KEY = 'RedisInjectKey';

@Module({
  providers: [
    {
      provide: REDIS_INJECT_KEY,
      useValue: redis.createClient({
        port: 6379,
        host: 'localhost',
      }),
    },
  ],
  exports: [REDIS_INJECT_KEY],
})
export class RedisModule {}

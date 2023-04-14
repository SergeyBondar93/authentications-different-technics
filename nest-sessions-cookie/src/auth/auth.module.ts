import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthSerializer } from './auth.serializer';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer],
  controllers: [AuthController],
})
export class AuthModule {}

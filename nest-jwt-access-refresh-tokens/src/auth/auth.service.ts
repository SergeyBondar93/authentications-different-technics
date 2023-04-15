import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dtos/auth.dto';
import { Tokens } from './types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // private readonly configService: ConfigService,
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };
    const [access_token, refresh_token] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: 'at-secret',
        expiresIn: '3s',
      }),
      await this.jwtService.signAsync(payload, {
        secret: 'rt-secret',
        expiresIn: '60s',
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateRtHash(userId: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.usersService.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async signinLocal(authDto: AuthDto): Promise<Tokens> {
    const user = await this.usersService.findUserByEmail(authDto.email);

    if (!user) {
      throw new UnauthorizedException(
        'User with this email and password not found',
      );
    }

    const isRightPassword = bcrypt.compare(authDto.password, user.pwHash);

    if (!isRightPassword) {
      throw new UnauthorizedException(
        'User with this email and password not found',
      );
    }

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
  async logout(userId: number) {
    await this.usersService.update({
      where: { id: userId },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }
  async refresh(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.usersService.findUserById(userId);

    if (!user || !refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const rtMatched = await bcrypt.compare(refreshToken, user.hashedRt);

    if (!rtMatched) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
}

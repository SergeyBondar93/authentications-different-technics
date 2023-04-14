import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    // this method uses by passport to find a user and pass to session
    console.log(
      'Local strategy validate method params email/pass: ',
      email,
      password,
    );
    const user = await this.authService.validateUser({ email, password });
    return user;
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-secret',
      // passport destroy token and put the user oject to request
      // this param we need to not only put user,
      // but and pass original token to request
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    // add the token to request
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();

    /**
     * sub userId
     * email
     * iat
     * exp
     */
    // here we can do some requests for user rights
    return { ...payload, refreshToken };
  }
}

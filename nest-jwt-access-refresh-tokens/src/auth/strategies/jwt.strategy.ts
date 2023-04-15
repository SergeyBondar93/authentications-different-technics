import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { UsersService } from '../../users/users.service';
import { RolesService } from '../../roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly rolesService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // тут делаем запросы к базюкам для насыщения объекта пользователя
    // этот объект запишется в request

    const user = await this.userService.findOneById(payload.sub);

    const rights = await this.rolesService.getRightsByRoles(user.roles);

    return {
      userId: payload.sub,
      username: payload.username,
      additional: 'this is some additional info',
      rights,
      ...user,
    };
  }
}

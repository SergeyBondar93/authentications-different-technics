import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  // find user in database and return or throw an error
  async validateUser(loginDto) {
    const { email, password } = loginDto;

    try {
      const user = await this.userService.findUserByEmail(email);

      const match = await bcrypt.compare(password, user.pwHash);

      if (match) {
        return { id: user.id, roles: user.roles };
      } else {
        throw new UnauthorizedException(
          'User with this email + password not found',
        );
      }
    } catch (error) {
      throw new UnauthorizedException(
        'User with this email + password not found',
      );
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const roles = {
  ADMIN: 'ADMIN',
  ACCOUNT_MANAGER: 'ACCOUNT_MANAGER',
};

@Injectable()
export class UsersService {
  users = {
    'user1@productioncoder.com': {
      pwHash: bcrypt.hashSync('user1pw', 10),
      roles: [roles.ADMIN],
      id: '41c514f4-7288-4199-80c0-e0be7e4353d7',
    },
    'user2@productioncoder.com': {
      pwHash: bcrypt.hashSync('user2pw', 10),
      roles: [roles.ACCOUNT_MANAGER],
      id: 'fa54f8ac-6ed7-49d5-b242-64b793da816a',
    },
  };

  async findUserByEmail(email) {
    const user = this.users[email];
    return user ? user : null;
  }

  async findUserById(id) {
    const user = Object.values(this.users).find((user) => user.id === id);

    return user ? user : null;
  }

  async switchRole(userId) {
    try {
      const user = await this.findUserById(userId);

      const prevRole = user.roles[0];

      if (prevRole === roles.ACCOUNT_MANAGER) {
        user.roles = [roles.ADMIN];
      } else {
        user.roles = [roles.ACCOUNT_MANAGER];
      }

      const { pwHash, ...sanitizedUser } = user;

      return sanitizedUser;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  getAll() {
    const users = Object.entries(this.users).map(([email, user]) => {
      const u = { email, ...user };
      delete u.pwHash;
      return u;
    });

    return users;
  }
}

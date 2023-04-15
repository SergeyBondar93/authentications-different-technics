import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type User = any;

export const roles = {
  ADMIN: 'ADMIN',
  ACCOUNT_MANAGER: 'ACCOUNT_MANAGER',
};

@Injectable()
export class UsersService {
  constructor() {}
  users = {
    'user1@productioncoder.com': {
      pwHash: bcrypt.hashSync('user1pw', 10),
      roles: [roles.ADMIN],
      id: '41c514f4-7288-4199-80c0-e0be7e4353d7',
      hashedRt: null,
      email: 'user1@productioncoder.com',
    },
    'user2@productioncoder.com': {
      pwHash: bcrypt.hashSync('user2pw', 10),
      roles: [roles.ACCOUNT_MANAGER],
      id: 'fa54f8ac-6ed7-49d5-b242-64b793da816a',
      hashedRt: null,
      email: 'user2@productioncoder.com',
    },
  };

  async findUserByEmail(email) {
    const user = this.users[email];
    return user ? user : null;
  }

  // prisma orm interface
  async update({ where, data }) {
    const findFn = where.id ? this.findUserById : this.findUserByEmail;
    const user = await findFn(where.id || where.email);

    Object.assign(user, data);
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

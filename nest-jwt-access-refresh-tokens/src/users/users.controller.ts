import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/profile')
  getMeProfile(@Req() req: Request) {
    const cookie = { jwt: req.headers['authorization'] };
    const user = (req as any).user;

    delete user.hashedRt;
    delete user.pwHash;

    return { cookie, user };
  }

  @Get('me/switch-role')
  switchRole(@Req() req) {
    const user = this.usersService.switchRole(req.user.id);

    return user;
  }

  @Get('all')
  @UseGuards(AdminGuard)
  getAll() {
    return this.usersService.getAll();
  }
}

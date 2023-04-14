import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me/profile')
  getMeProfile(@Req() req) {
    const cookie = req.session.cookie;
    const user = req.user;
    return { cookie, user };
  }

  @Get('me/switch-role')
  switchRole(@Req() req) {
    const user = this.usersService.switchRole(req.session.user.id);
    return user;
  }

  @Get('all')
  @UseGuards(AdminGuard)
  getAll() {
    return this.usersService.getAll();
  }
}

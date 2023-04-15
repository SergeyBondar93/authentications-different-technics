import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/profile')
  getMeProfile(@Req() req: Request) {
    const cookie = { jwt: req.headers['Authentication'] };
    const user = (req as any).user;
    return { cookie, user };
  }

  @Get('all')
  @UseGuards(AdminGuard)
  getAll() {
    return this.usersService.getAll();
  }

  @Get('me/switch-role')
  switchRole(@Req() req) {
    const user = this.usersService.switchRole(req.user.id);
    return user;
  }

  // @Put('update')
  // async updateCurrentUser(
  //   @Body() updateUserDto: Record<string, any>,
  //   @Request() req,
  // ) {
  //   const user = await this.usersService.update(
  //     req.user.username,
  //     updateUserDto,
  //   );
  //   return user;
  // }
}

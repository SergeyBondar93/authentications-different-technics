import { ExecutionContext, Injectable } from '@nestjs/common';

import { roles } from 'src/users/users.service';
import { AtGuard } from './at.guard';

@Injectable()
export class AdminGuard extends AtGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return super.canActivate(context) && req.user.roles.includes(roles.ADMIN);
  }
}

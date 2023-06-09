import { ExecutionContext, Injectable } from '@nestjs/common';

import { LoggedInGuard } from './logged-in.guard';
import { roles } from 'src/users/users.service';

@Injectable()
export class AdminGuard extends LoggedInGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return super.canActivate(context) && req.user.roles.includes(roles.ADMIN);
  }
}

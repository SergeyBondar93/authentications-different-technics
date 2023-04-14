import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // passport add isAuthenticated() method to request
    //  when we use sessions,
    // to determine whether user logged in or not
    return context.switchToHttp().getRequest().isAuthenticated();
  }
}

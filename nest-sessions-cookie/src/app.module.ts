import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { ProfileController } from './profile/profile.controller';
import { LogoutController } from './logout/logout.controller';
import { LogoutModule } from './logout/logout.module';
import { ProfileModule } from './profile/profile.module';
import { SwitchRoleModule } from './switch-role/switch-role.module';

@Module({
  imports: [LoginModule, LogoutModule, ProfileModule, SwitchRoleModule],
  controllers: [ProfileController, LogoutController],
})
export class AppModule {}

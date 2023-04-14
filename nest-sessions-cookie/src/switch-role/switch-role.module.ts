import { Module } from '@nestjs/common';
import { SwitchRoleController } from './switch-role.controller';

@Module({
  controllers: [SwitchRoleController]
})
export class SwitchRoleModule {}

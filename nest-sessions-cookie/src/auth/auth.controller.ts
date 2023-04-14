import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { LocalGuard } from './guards/local.guard';
import { Public } from './decorators/public.decorator';
import { Request } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Public()
  @Post('login')
  loginUser(@Req() req, @Body() user: LoginDto) {
    return req.user;
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    req.logOut((err) => {
      console.log(err);
    });

    return;
  }
}

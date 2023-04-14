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

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req, @Body() user: LoginDto) {
    console.log('The body of login: ', user);
    return req.session;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  logout(@Session() session) {
    session.user = null;
    return;
  }
}

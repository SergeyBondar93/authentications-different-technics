import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { AuthDto } from './dtos/auth.dto';
import { Tokens } from './types';
import { RtGuard } from './guards/rt.guard';
import { GetCurrentUserId } from '../common/decorators/current.user.id.decorator';
import { GetCurrentUser } from '../common/decorators/current.user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('local/signup')
  signupLocal(@Body() authDto: AuthDto): Promise<Tokens> {
    // return this.authService.signupLocal(authDto);
    return;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() authDto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(authDto);
  }

  @Get('logout')
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refresh(userId, refreshToken);
  }
}

// https://www.youtube.com/watch?v=uAKzFhE3rxU

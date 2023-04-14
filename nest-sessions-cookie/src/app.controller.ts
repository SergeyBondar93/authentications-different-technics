import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { Public } from './auth/decorators/public.decorator';

const index = path.resolve(
  __dirname,
  '..',
  '..',
  'static',
  'cookie-session.html',
);

@Controller('')
export class AppController {
  @Get('')
  @Public()
  index(@Res() res: Response) {
    res.sendFile(index);
  }
}

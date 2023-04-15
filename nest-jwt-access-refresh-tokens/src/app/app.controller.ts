import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { Public } from 'src/common/decorators';

const index = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'static',
  'jwt-refresh.html',
);

@Controller('')
export class AppController {
  @Get('')
  @Public()
  index(@Res() res: Response) {
    res.sendFile(index);
  }
}

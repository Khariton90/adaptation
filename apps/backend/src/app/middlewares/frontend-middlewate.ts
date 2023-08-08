import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from "express"
import path, { resolve } from 'path';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    res.sendFile(resolve(path.join(__dirname, 'build', 'index.html')));
  }
}
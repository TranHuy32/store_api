
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImageService } from './images.service';
import { Response } from 'express';
import BaseController from 'src/base.controller';

@Controller('image')
export class ImageController extends BaseController {
  constructor(private readonly imageService: ImageService) { super() }

  @Get('/:filename')
  async getImage(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    return await this.imageService.getImage(filename, res);
  }
}

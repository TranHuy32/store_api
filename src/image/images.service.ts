
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Image } from './entity/images.entity';
import { v4 as uuidv4 } from 'uuid';
import { ImageRepository } from './repository/images.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: ImageRepository
  ) { }

  async getImageOption(image: Image, isDetail: boolean): Promise<any> {
    const baseUrlImage: string = `${process.env.BASEURL}:${process.env.PORT}/image/`;
    const imagePath = baseUrlImage + image.filename
    if (!isDetail) {
      return image
    }
    return {
      id: image?.id || null,
      path: imagePath || null,
    }
  }

  async createImage(
    image: Express.Multer.File,
  ): Promise<any> {
    try {
      const imageCreated = this.imageRepository.create({
        filename: image.filename,
        created_at: new Date(),
        id: uuidv4()
      });

      await this.imageRepository.save(imageCreated);

      return await this.getImageOption(imageCreated, true);
    } catch (e) {
      console.log(`[createImage] ${e}`);
    }

  }

  async findImageById(id: string): Promise<Image> {
    return await this.imageRepository.findOne({ where: { id } });
  }

  async getImage(filename: string, res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

}

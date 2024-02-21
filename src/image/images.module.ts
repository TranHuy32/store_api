import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ImageController } from "./images.controller";
import { ImageService } from "./images.service";
import { ImageRepository } from "./repository/images.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "./entity/images.entity";

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // Giới hạn dung lượng file 5MB
      },
    }),
    TypeOrmModule.forFeature([Image]),
],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
  exports: [ImageService],
})
export class ImageModule {}


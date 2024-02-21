import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProductRepository } from "./repository/products.repository";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { Product } from "./entity/products.entity";
import { UsersModule } from "src/users/users.module";
import { CategoryModule } from "src/categories/categories.module";
import { MulterModule } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from 'multer';
import { ImageModule } from "src/image/images.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
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
        UsersModule,
        CategoryModule,
        ImageModule
    ],
    providers: [ProductService, ProductRepository],
    controllers: [ProductController],
    exports: [ProductService, ProductRepository],
})
export class ProductModule { }


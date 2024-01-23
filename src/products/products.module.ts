import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProductRepository } from "./repository/products.repository";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { Product } from "./entity/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductService, ProductRepository],
    controllers: [ProductController],
    exports: [ProductService, ProductRepository],
})
export class ProductModule { }
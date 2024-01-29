import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProductRepository } from "./repository/products.repository";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { Product } from "./entity/products.entity";
import { UsersModule } from "src/users/users.module";
import { CategoryModule } from "src/categories/categories.module";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), UsersModule, CategoryModule],
    providers: [ProductService, ProductRepository],
    controllers: [ProductController],
    exports: [ProductService, ProductRepository],
})
export class ProductModule { }
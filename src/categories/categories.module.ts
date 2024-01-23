import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CategoryRepository } from "./repository/categories.repository";
import { CategoryController } from "./categories.controller";
import { CategoryService } from "./categories.service";
import { Category } from "./entity/categories.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService, CategoryRepository],
    controllers: [CategoryController],
    exports: [CategoryService, CategoryRepository],
})
export class CategoryModule { }
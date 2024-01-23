import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import { CategoryService } from './categories.service';


@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.categoryService.findAll();
    }

}

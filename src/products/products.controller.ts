import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import { ProductService } from './products.service';


@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.productService.findAll();
    }

}

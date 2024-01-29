import {
    Body,
    Controller, Get, Post, Query, Req, UseGuards,
} from '@nestjs/common';
import { ProductService } from './products.service';
import BaseController from 'src/base.controller';
import { UserAuthGuard } from 'src/auth/users-auth/guards/auth.guard';
import CommonError, { ErrorCode } from 'src/common/error/common.error';


@Controller('products')
export class ProductController extends BaseController {
    constructor(
        private readonly productService: ProductService,
    ) {
        super();
    }

    @UseGuards(UserAuthGuard)
    @Get('all')
    async findAll(
        @Query() query: any,
        @Req() req: any,
        ) {
        console.log('[API] GET products/all');
        try {
            const user = req.user; 
            if (!user) {
              throw new CommonError(ErrorCode.USER_IS_EMPTY);
            }

            const result = await this.productService.findAll(user, query);
            
            if (result instanceof CommonError) {
              throw result;
            }
            return this.data(result);
          } catch (error) {
            if (error instanceof CommonError) return error;
            return this.fail(error);
          }
    }

}

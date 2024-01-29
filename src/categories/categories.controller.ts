import {
    Body,
    Controller, Get, Post, Query, Req, UseGuards,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/categories.dto';
import { UserAuthGuard } from 'src/auth/users-auth/guards/auth.guard';
import CommonError, { ErrorCode } from 'src/common/error/common.error';
import BaseController from 'src/base.controller';


@Controller('categories')
export class CategoryController extends BaseController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {
        super()
    }

    @UseGuards(UserAuthGuard)
    @Get('all')
    async findAll(
        @Query() query: any,
        @Req() req: any,
        ) {
        console.log('[API] GET categories/all');
        try {
            const user = req.user; 
            if (!user) {
              throw new CommonError(ErrorCode.USER_IS_EMPTY);
            }

            const result = await this.categoryService.findAll(user);
            
            if (result instanceof CommonError) {
              throw result;
            }
            return this.data(result);
          } catch (error) {
            if (error instanceof CommonError) return error;
            return this.fail(error);
          }
    }

    @UseGuards(UserAuthGuard)
    @Post('create')
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
        @Req() req: any,
    ) {
        console.log('[API] POST categories/create');
        try {
            const user = req.user;
            if (!user) {
                throw new CommonError(ErrorCode.USER_IS_EMPTY);
            }
            const result = await this.categoryService.createCategory(createCategoryDto);
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

import {
    Body,
    Controller, Get, Post, Query, Req, UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customers.service';
import BaseController from 'src/base.controller';
import { UserAuthGuard } from 'src/auth/users-auth/guards/auth.guard';
import { CreateCustomerDto } from './dto/customers.dto';
import CommonError, { ErrorCode } from 'src/common/error/common.error';


@Controller('customers')
export class CustomerController extends BaseController {
    constructor(
        private readonly customerService: CustomerService,
    ) {
        super()
    }

    @UseGuards(UserAuthGuard)
    @Get('all')
    async findAll(
        @Query() query: any,
        @Req() req: any,
    ) {
        console.log('[API] GET customers/all');
        try {
            const user = req.user;
            if (!user) {
                throw new CommonError(ErrorCode.USER_IS_EMPTY);
            }

            const result = await this.customerService.findAll(user, query);

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
        @Body() createCustomerDto: CreateCustomerDto,
        @Req() req: any,
    ) {
        console.log('[API] POST customers/create');
        try {
            const user = req.user;
            if (!user) {
                throw new CommonError(ErrorCode.USER_IS_EMPTY);
            }

            const result = await this.customerService.createCustomer(createCustomerDto);

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

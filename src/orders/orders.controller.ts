import {
    Body,
    Controller, Get, Post, Req, UseGuards,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { UserAuthGuard } from 'src/auth/users-auth/guards/auth.guard';
import { CreateOrderDto } from './dto/orders.dto';
import CommonError, { ErrorCode } from 'src/common/error/common.error';
import BaseController from 'src/base.controller';


@Controller('orders')
export class OrderController extends BaseController {
    constructor(
        private readonly orderService: OrderService,
    ) {
        super()
    }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.orderService.findAll();
    }

    @UseGuards(UserAuthGuard)
    @Post('create')
    async create(
        @Body() createOrderDto: CreateOrderDto,
        @Req() req: any,
    ) {
        console.log('[API] POST orders/create');
        try {
            const user = req.user;
            if (!user) {
                throw new CommonError(ErrorCode.USER_IS_EMPTY);
            }
            const result = await this.orderService.createOrder(createOrderDto, user);
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

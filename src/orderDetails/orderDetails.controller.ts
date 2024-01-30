import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import { OrderDetailService } from './orderDetails.service';
import BaseController from 'src/base.controller';


@Controller('orderDetail')
export class OrderDetailController extends BaseController{
    constructor(
        private readonly orderDetailService: OrderDetailService,
    ) { super() }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.orderDetailService.findAll();
    }

}

import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import { OrderDetailService } from './orderDetails.service';


@Controller('orderDetail')
export class OrderDetailController {
    constructor(
        private readonly orderDetailService: OrderDetailService,
    ) { }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.orderDetailService.findAll();
    }

}

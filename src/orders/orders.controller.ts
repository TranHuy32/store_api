import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import { OrderService } from './orders.service';


@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.orderService.findAll();
    }

}

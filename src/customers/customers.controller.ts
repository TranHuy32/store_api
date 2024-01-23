import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import { CustomerService } from './customers.service';


@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
    ) { }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.customerService.findAll();
    }

}

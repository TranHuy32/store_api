import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import { WarehouseService } from './warehouses.service';


@Controller('warehouse')
export class WarehouseController {
    constructor(
        private readonly warehouseService: WarehouseService,
    ) { }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.warehouseService.findAll();
    }

}

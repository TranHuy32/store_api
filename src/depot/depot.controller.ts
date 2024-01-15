import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';

import { DepotService } from './depot.service';

@Controller('depot')
export class DepotController {
    constructor(
        private readonly depotService: DepotService,
    ) { }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.depotService.findAll();
    }

}

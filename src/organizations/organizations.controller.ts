import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';
import { OrganizationService } from './organizations.service';


@Controller('organization')
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationService,
    ) { }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.organizationService.findAll();
    }

}

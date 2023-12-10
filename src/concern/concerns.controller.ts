import {
    Body,
    Controller, Get
} from '@nestjs/common';
import { ConcernsService } from './concerns.service';


@Controller('concerns')
export class ConcernsController {
    constructor(
        private readonly concernService: ConcernsService,
    ) { }

    @Get('all')
    async findAll() {
        return await this.concernService.findAll();
    }

}

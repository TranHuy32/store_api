import {
    Body,
    Controller, Get, Post,
} from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post('register')
    async register(@Body() Body: any) {
        // return await this.usersService.findDetailByUserName(user.userName);
    }

    @Get('findAll')
    async findAll(@Body() Body: any) {
        return await this.usersService.findAll();
    }

}

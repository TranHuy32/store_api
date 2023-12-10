import { Body, Controller, Post } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('tokens')
export class TokensController {
    constructor(
        private readonly tokensService: TokensService,
    ) { }

}

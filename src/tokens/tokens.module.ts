import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entity/tokens.entity';
import { TokenRepository } from './repository/tokens.repository';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
@Module({
    imports: [TypeOrmModule.forFeature([Token])],
    providers: [TokensService, TokenRepository],
    controllers: [TokensController],
    exports: [TokensService, TokenRepository],
})
export class TokensModule { }
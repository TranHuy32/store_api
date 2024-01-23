import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entity/tokens.entity';
import { TokenRepository } from './repository/tokens.repository';
import { CreateTokenDto } from './dto/create-token.dto';
import { v4 as uuidv4 } from 'uuid';

const moment = require('moment');

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(Token)
        private tokenRepository: TokenRepository,
    ) { }

    async createToken(
        createTokenDto: CreateTokenDto,
    ): Promise<Token | string> {
        const token = await this.findTokenByUserId(createTokenDto.staff_id);
        if (token) {
            return 'Token existed';
        } else {
            const a = this.tokenRepository.create({ ...createTokenDto, created_at: new Date(), id: uuidv4() });
            return await this.tokenRepository.save(a);
        }
    }

    async findTokenByUserId(user_id: string): Promise<Token> {
        const token = await this.tokenRepository.findOne({ where: { staff_id: user_id } })
        return token;
    }

    async findTokenById(id: string): Promise<Token> {
        return this.tokenRepository.findOne({ where: { id: id } })
    }

    async findTokenByRefreshToken(refreshToken: string): Promise<Token> {
        return this.tokenRepository.findOne({ where: { refresh_token: refreshToken } })
    }

    async updateTokenById(id: string, tokenData: Partial<Token>): Promise<Token | undefined> {
        await this.tokenRepository.update(id, tokenData);
        return this.tokenRepository.findOne({ where: { id: id } })
    }
}
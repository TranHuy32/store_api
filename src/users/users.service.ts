import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateTokenDto } from 'src/tokens/dto/create-token.dto';
import CommonError, { ErrorCode } from 'src/common/error/common.error';

const moment = require('moment');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private tokensService: TokensService,
    ) { }

    async findAll(): Promise<User[]> {
        const rs = await this.userRepository.find();
        return rs
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) {
            throw new CommonError(ErrorCode.USER_NOT_FOUND);
        }
        return user;
    }

    async getUserByRefresh(refreshToken: string, userName: string) {
        const user = await this.userRepository.findOne({ where: { username: userName } })
        if (!user) {
            throw new UnauthorizedException('User Not Found');
        }
        const token = await this.tokensService.findTokenByUserId(user.id)
        const is_equal = await bcrypt.compare(
            refreshToken.split('').reverse().join(''),
            token.refresh_token.trim()
        );
        if (!is_equal) {
            throw new UnauthorizedException();
        }
        return this.getDetailUser(user);
    }

    // Kiem tra nguoi dung
    async validateUser(UserName: string, PassWord: string) {
        const user = await this.userRepository.findOne({ where: { username: UserName } })
        if (!user) throw new UnauthorizedException('Wrong UserName');
        if (!!user.deleted_at) throw new UnauthorizedException('User Is Inactive');
        if (!(PassWord === user.password)) throw new UnauthorizedException('Wrong Password');
        return this.getDetailUser(user);
    }

    //Lay du lieu User
    async getDetailUser(user: User): Promise<any> {
        const updatedAtTimestamp = user?.updated_at?.valueOf() || null;
        return {
            id: user.id,
            username: user.username,
            name: user.name,
            updatedAt: updatedAtTimestamp,
        };
    }

    async updateRefreshToken(userName: string, update: any) {
        const existingUser = await this.userRepository.findOne({ where: { username: userName } })
        if (existingUser) {
            if (update.RefreshToken) {
                update.RefreshToken = await bcrypt.hash(
                    update.RefreshToken.split('').reverse().join(''),
                    10,
                );
                if (update.AccessToken) {
                    update.AccessToken = await bcrypt.hash(
                        update.AccessToken.split('').reverse().join(''),
                        10,
                    );
                }
            }
            const token = await this.tokensService.findTokenByUserId(existingUser.id)
            if (!token) {
                const createTokenDto = new CreateTokenDto();
                createTokenDto.staff_id = existingUser.id;
                createTokenDto.refresh_token = update.RefreshToken;
                createTokenDto.access_token = update.AccessToken;
                this.tokensService.createToken(createTokenDto)
            } else {
                token.refresh_token = update.RefreshToken;
                token.access_token = update.AccessToken;
                token.updated_at = new Date()
                await this.tokensService.updateTokenById(token.id, token)
            }
        }
        return existingUser
    }

}
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateTokenDto } from 'src/tokens/dto/create-token.dto';
import { ConcernsService } from 'src/concern/concerns.service';

const moment = require('moment');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
        private tokensService: TokensService,
        private concernsService: ConcernsService,
    ) { }

    async findAll(): Promise<User[]> {
        const rs = await this.userRepository.find();
        return rs
    }

    async getUserByRefresh(refreshToken: string, userName: string) {
        const user = await this.userRepository.findOne({ where: { UserName: userName } })
        if (!user) {
            throw new UnauthorizedException('User Not Found');
        }
        const token = await this.tokensService.findTokenByUserId(user.ID)
        const is_equal = await bcrypt.compare(
            refreshToken.split('').reverse().join(''),
            token.RefreshToken.trim()
        );
        if (!is_equal) {
            throw new UnauthorizedException();
        }
        return this.getDetailUser(user);
    }

    // Kiem tra nguoi dung
    async validateUser(UserName: string, PassWord: string, MaDV: string) {
        const user = await this.userRepository.findOne({ where: { UserName: UserName } })        
        const concern = await this.concernsService.findByMaDV(MaDV)
        if(!concern || concern.MaDV !== MaDV){
            throw new UnauthorizedException('Wrong MaDV');
        }
        if (!user) throw new UnauthorizedException('Wrong UserName');
        if (!user.InUsed) throw new UnauthorizedException('User Is Inactive');
        if (!(PassWord === user.PassWord)) throw new UnauthorizedException('Wrong Password');
        return this.getDetailUser(user);
    }

    //Lay du lieu User
    async getDetailUser(user: User): Promise<any> {
        const editedOnTimestamp = user.EditedOn.valueOf();
        return {
            ID: user.ID,
            ID_KhachHang: user.ID_KhachHang,
            UserName: user.UserName,
            HoTen: user.HoTen,
            InUsed: user.InUsed,
            EditedOn: editedOnTimestamp,
        };
    }

    async updateRefreshToken(userName: string, update: any) {
        const existingUser = await this.userRepository.findOne({ where: { UserName: userName } })
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
            const token = await this.tokensService.findTokenByUserId(existingUser.ID)
            if (!token) {
                const createTokenDto = new CreateTokenDto();
                createTokenDto.UserID = existingUser.ID;
                createTokenDto.RefreshToken = update.RefreshToken;
                createTokenDto.AccessToken = update.AccessToken;
                this.tokensService.createToken(createTokenDto)
            } else {
                token.RefreshToken = update.RefreshToken;
                token.AccessToken = update.AccessToken;
                token.EditedOn = new Date()
                await this.tokensService.updateTokenById(token.ID, token)
            }
        }
        return existingUser
    }

}
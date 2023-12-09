import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { UserRepository } from './repository/user.repository';
const moment = require('moment');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: UserRepository,
    ) { }

    async findAll(): Promise<User[]> {
        const rs = await this.usersRepository.find();
        return rs
    }

    // Kiem tra nguoi dung
    async validateUser(UserName: string, PassWord: string) {
        const user = await this.usersRepository.findOne({ where: { UserName: UserName } })
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

}
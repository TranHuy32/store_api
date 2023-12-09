import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login.dto';
const ms = require('ms');;
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  // login
  async login(loginUserDto: LoginUserDto) {
    const { UserName, PassWord } = loginUserDto;
    const user = await this.usersService.validateUser(UserName, PassWord);
    console.log(user);

    if (!user) return false;
    return true
  }
}

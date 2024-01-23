import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login.dto';
import { User } from 'src/users/entity/users.entity';
const ms = require('ms');;
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async _createToken(user: User, refresh: boolean, deviceToken?: string): Promise<any> {
    const accessToken = this.jwtService.sign({ user });
    const refreshToken = this.jwtService.sign(
      { user },
      {
        secret: process.env.SECRETKEY_REFRESH,
        expiresIn: process.env.EXPIRESIN_REFRESH,
      },
    );
    await this.usersService.updateRefreshToken(user.username, {
      RefreshToken: refreshToken,
      AccessToken: accessToken,
    });
    return { accessToken, refreshToken };
  }

  // login
  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.usersService.validateUser(username, password);
    if (!user) return false;
    const token = await this._createToken(user, false);
    return token
  }

  // Refresh token
  async refresh(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.SECRETKEY_REFRESH,
      });
      const user = await this.usersService.getUserByRefresh(
        refreshToken,
        payload.user.userName,
      );
      const newAccessToken = await this._createToken(user, true);
      return newAccessToken;
    } catch (e) {
      return 'Invalid token';
    }
  }

}

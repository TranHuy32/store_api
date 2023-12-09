import { Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersAuthService } from './users.auth.service';
import { UserAuthGuard } from './guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login.dto';

@Controller('users-auth')
export class UsersAuthController {
  constructor(
    private usersAuthService: UsersAuthService,
    private usersService: UsersService
  ) { }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersAuthService.login(loginUserDto);
  }

  // @Post('refresh')
  // async refreshToken(@Body() bodyToken: any) {
  //   const result = await this.usersAuthService.refresh(bodyToken.refreshToken);
  //   return result;
  // }

  // @Post('logout')
  // async logout(@Body() bodyToken: any) {
  //   const result = await this.usersAuthService.logout(bodyToken.refreshToken);
  //   return result;
  // }

}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entity/users.entity';
import { UserRepository } from './repository/user.repository';
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UserRepository],
    controllers: [UsersController],
    exports: [UsersService, UserRepository],
})
export class UsersModule { }
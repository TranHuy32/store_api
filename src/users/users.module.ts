import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entity/users.entity';
import { UserRepository } from './repository/user.repository';
import { TokensModule } from 'src/tokens/tokens.module';
@Module({
    imports: [TypeOrmModule.forFeature([User]), TokensModule],
    providers: [UsersService, UserRepository],
    controllers: [UsersController],
    exports: [UsersService, UserRepository],
})
export class UsersModule { }
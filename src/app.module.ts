import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UsersAuthModule } from './auth/users-auth/users.auth.module';
import { TokensModule } from './tokens/tokens.module';
import 'dotenv/config';
import { DepotModule } from './depot/depot.module';

@Module({
  imports: [DatabaseModule, UsersModule, UsersAuthModule, TokensModule, DepotModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

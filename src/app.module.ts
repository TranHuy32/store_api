import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database.module';
import { databaseProviders } from './common/database.providers';
import { UsersModule } from './users/users.module';
import { UsersAuthModule } from './auth/users-auth/users.auth.module';
import { TokensModule } from './tokens/tokens.module';
import 'dotenv/config';
import { ConcernsModule } from './concern/concerns.module';

@Module({
  imports: [DatabaseModule, UsersModule, UsersAuthModule, TokensModule, ConcernsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

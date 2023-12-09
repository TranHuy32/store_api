import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database.module';
import { databaseProviders } from './common/database.providers';
import { UsersModule } from './users/users.module';
import { UsersAuthModule } from './auth/users-auth/users.auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, UsersAuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

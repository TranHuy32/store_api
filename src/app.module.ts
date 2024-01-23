import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UsersAuthModule } from './auth/users-auth/users.auth.module';
import { TokensModule } from './tokens/tokens.module';
import 'dotenv/config';
import { WarehouseModule } from './warehouses/warehouses.module';
import { CategoryModule } from './categories/categories.module';
import { ProductModule } from './products/products.module';
import { OrderModule } from './orders/orders.module';
import { OrderDetailModule } from './orderDetails/orderDetails.module';
import { CustomerModule } from './customers/customers.module';
import { OrganizationModule } from './organizations/organizations.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    UsersAuthModule,
    TokensModule,
    WarehouseModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    OrderDetailModule,
    CustomerModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

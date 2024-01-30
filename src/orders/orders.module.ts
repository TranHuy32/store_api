import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { OrderRepository } from "./repository/orders.repository";
import { OrderController } from "./orders.controller";
import { OrderService } from "./orders.service";
import { Order } from "./entity/orders.entity";
import { ProductModule } from "src/products/products.module";
import { OrderDetailModule } from "src/orderDetails/orderDetails.module";
import { CustomerModule } from "src/customers/customers.module";

@Module({
    imports: [TypeOrmModule.forFeature([Order]), ProductModule, OrderDetailModule, CustomerModule],
    providers: [OrderService, OrderRepository],
    controllers: [OrderController],
    exports: [OrderService, OrderRepository],
})
export class OrderModule { }
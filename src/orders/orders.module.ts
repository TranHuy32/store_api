import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { OrderRepository } from "./repository/orders.repository";
import { OrderController } from "./orders.controller";
import { OrderService } from "./orders.service";
import { Order } from "./entity/orders.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [OrderService, OrderRepository],
    controllers: [OrderController],
    exports: [OrderService, OrderRepository],
})
export class OrderModule { }
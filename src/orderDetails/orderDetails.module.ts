import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { OrderDetailRepository } from "./repository/orderDetails.repository";
import { OrderDetailController } from "./orderDetails.controller";
import { OrderDetailService } from "./orderDetails.service";
import { OrderDetail } from "./entity/orderDetails.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    providers: [OrderDetailService, OrderDetailRepository],
    controllers: [OrderDetailController],
    exports: [OrderDetailService, OrderDetailRepository],
})
export class OrderDetailModule { }
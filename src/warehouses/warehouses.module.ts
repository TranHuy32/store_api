import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { WarehouseController } from "./warehouses.controller";
import { Warehouse } from "./entity/warehouses.entity";
import { WarehouseService } from "./warehouses.service";
import { WarehouseRepository } from "./repository/warehouses.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Warehouse])],
    providers: [WarehouseService, WarehouseRepository],
    controllers: [WarehouseController],
    exports: [WarehouseService, WarehouseRepository],
})
export class WarehouseModule { }
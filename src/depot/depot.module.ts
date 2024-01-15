import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Depot } from "./entity/depot.entity";
import { DepotService } from "./depot.service";
import { DepotRepository } from "./repository/depot.repository";
import { DepotController } from "./depot.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Depot])],
    providers: [DepotService, DepotRepository],
    controllers: [DepotController],
    exports: [DepotService, DepotRepository],
})
export class DepotModule { }
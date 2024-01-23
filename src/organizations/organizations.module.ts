import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { OrganizationRepository } from "./repository/organizations.repository";
import { OrganizationController } from "./organizations.controller";
import { OrganizationService } from "./organizations.service";
import { Organization } from "./entity/organizations.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Organization])],
    providers: [OrganizationService, OrganizationRepository],
    controllers: [OrganizationController],
    exports: [OrganizationService, OrganizationRepository],
})
export class OrganizationModule { }
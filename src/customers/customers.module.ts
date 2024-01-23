import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CustomerRepository } from "./repository/customers.repository";
import { CustomerController } from "./customers.controller";
import { CustomerService } from "./customers.service";
import { Customer } from "./entity/customers.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    providers: [CustomerService, CustomerRepository],
    controllers: [CustomerController],
    exports: [CustomerService, CustomerRepository],
})
export class CustomerModule { }
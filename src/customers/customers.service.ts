import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customers.entity';
import { CustomerRepository } from './repository/customers.repository';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: CustomerRepository
    ) { }

    async findAll(): Promise<Customer[]> {
        const rs = await this.customerRepository.find();
        return rs
    }

}
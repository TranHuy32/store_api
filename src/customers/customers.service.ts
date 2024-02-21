import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customers.entity';
import { CustomerRepository } from './repository/customers.repository';
import { CreateCustomerDto } from './dto/customers.dto';
import CommonError, { ErrorCode } from 'src/common/error/common.error';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/entity/users.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: CustomerRepository
    ) { }

    async getCustomerOption(customer: Customer, isDetail: boolean): Promise<any> {
        if (!isDetail) {
            return {
                id: customer.id,
                name: customer.name,
                phonenumber: customer.phonenumber,
                address: customer.address,
                email: customer.email,
            }
        }
        return {
            id: customer.id,
            name: customer.name,
            phonenumber: customer.phonenumber,
            address: customer.address,
            email: customer.email,
        }
    }

    async findAll(user: User, q?: any): Promise<{ customers: Customer[]; total: number }> {
        const customers = (await this.customerRepository.find()).filter((p) => !!!p.deleted_at);

        let filteredCustomers = customers

        if (!!q.search) {
            filteredCustomers = filteredCustomers.filter((c) => c.name.includes(q.search) || c.phonenumber.includes(q.search))
        }

        let responseCustomers = filteredCustomers.sort((a, b) => a.created_at?.getTime() - b.created_at?.getTime());

        if (!!q.page && !!q.pageSize) {
            const adjustedPage = +q.page;
            const adjustedPageSize = +q.pageSize;
            const startIndex = (adjustedPage - 1) * adjustedPageSize;
            const endIndex = startIndex + adjustedPageSize;
            responseCustomers = responseCustomers.slice(startIndex, endIndex);
        }
        const results = await Promise.all(
            responseCustomers.map(async (customer) => this.getCustomerOption(customer, false)),
        );
        return { customers: results, total: filteredCustomers.length || 0 }
    }

    async getCustomerByPhonenumber(phonenumber: string) {
        const customer = await this.customerRepository.findOne({ where: { phonenumber } })
        if (!customer) {
            return null;
        }
        return customer;
    }

    async getCustomerById(id: string) {
        const customer = await this.customerRepository.findOne({ where: { id } })
        if (!customer) {
            return null;
        }
        return customer;
    }

    async validatePhonenumber(phonenumber: string): Promise<Boolean> {
        if (!phonenumber) {
            throw new CommonError(ErrorCode.MISSING_PHONENUMBER);
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phonenumber)) {
            throw new CommonError(ErrorCode.INVALID_PHONENUMBER_FORMAT);
        }
        return
    }

    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<any> {
        await this.validatePhonenumber(createCustomerDto.phonenumber)
        const customer = await this.getCustomerByPhonenumber(createCustomerDto.phonenumber);
        if (customer) {
            throw new CommonError(ErrorCode.CUSTOMER_EXISTED)
        }
        const customerCreated = this.customerRepository.create({ ...createCustomerDto, created_at: new Date(), id: uuidv4() });
        await this.customerRepository.save(customerCreated);
        return await this.getCustomerOption(customerCreated, true)
    }

}
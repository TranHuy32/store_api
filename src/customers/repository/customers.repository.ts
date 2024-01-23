import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entity/customers.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

    async findAll(): Promise<Customer[]> {
        return await this.find();
    }

    async findById(id: string): Promise<Customer | undefined> {
        return await this.findOne({ where: { id: id } })
    }

    async createCustomer(data: Partial<Customer>): Promise<Customer> {
        const warehouse = this.create(data);
        return await this.save(warehouse);
    }

    async updateById(id: string, data: Partial<Customer>): Promise<Customer | undefined> {
        await this.update(id, data);
        return this.findOne({ where: { id: id } })
    }

    async deleteById(id: string): Promise<void> {
        await this.delete(id);
    }

    async findByName(name: string): Promise<Customer | undefined> {
        return await this.findOne({ where: { name: name } })
    }

    async getBy(fieldName: string, fieldValue: any): Promise<Customer | undefined> {
        const query = {};
        query[fieldName] = fieldValue;
        return await this.findOne({ where: query });
    }
}

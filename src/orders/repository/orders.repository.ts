import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entity/orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {

    async findAll(): Promise<Order[]> {
        return await this.find();
    }

    async findById(id: string): Promise<Order | undefined> {
        return await this.findOne({ where: { id: id } })
    }

    async createOrder(data: Partial<Order>): Promise<Order> {
        const warehouse = this.create(data);
        return await this.save(warehouse);
    }

    async updateById(id: string, data: Partial<Order>): Promise<Order | undefined> {
        await this.update(id, data);
        return this.findOne({ where: { id: id } })
    }

    async deleteById(id: string): Promise<void> {
        await this.delete(id);
    }

    async getBy(fieldName: string, fieldValue: any): Promise<Order | undefined> {
        const query = {};
        query[fieldName] = fieldValue;
        return await this.findOne({ where: query });
    }
}

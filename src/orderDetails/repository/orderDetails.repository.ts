import { EntityRepository, Repository } from 'typeorm';
import { OrderDetail } from '../entity/orderDetails.entity';

@EntityRepository(OrderDetail)
export class OrderDetailRepository extends Repository<OrderDetail> {

    async findAll(): Promise<OrderDetail[]> {
        return await this.find();
    }

    async findById(id: string): Promise<OrderDetail | undefined> {
        return await this.findOne({ where: { id: id } })
    }

    async createOrderDetail(data: Partial<OrderDetail>): Promise<OrderDetail> {
        const warehouse = this.create(data);
        return await this.save(warehouse);
    }

    async updateById(id: string, data: Partial<OrderDetail>): Promise<OrderDetail | undefined> {
        await this.update(id, data);
        return this.findOne({ where: { id: id } })
    }

    async deleteById(id: string): Promise<void> {
        await this.delete(id);
    }

    async getBy(fieldName: string, fieldValue: any): Promise<OrderDetail | undefined> {
        const query = {};
        query[fieldName] = fieldValue;
        return await this.findOne({ where: query });
    }
}

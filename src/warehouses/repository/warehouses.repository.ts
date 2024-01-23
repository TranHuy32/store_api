import { EntityRepository, Repository } from 'typeorm';
import { Warehouse } from '../entity/warehouses.entity';

@EntityRepository(Warehouse)
export class WarehouseRepository extends Repository<Warehouse> {

    async findAll(): Promise<Warehouse[]> {
        return await this.find();
    }

    async findById(id: string): Promise<Warehouse | undefined> {
        return await this.findOne({ where: { id: id } })
    }

    async createWarehouse(warehouseData: Partial<Warehouse>): Promise<Warehouse> {
        const warehouse = this.create(warehouseData);
        return await this.save(warehouse);
    }

    async updateById(id: string, warehouseData: Partial<Warehouse>): Promise<Warehouse | undefined> {
        await this.update(id, warehouseData);
        return this.findOne({ where: { id: id } })
    }

    async deleteById(id: string): Promise<void> {
        await this.delete(id);
    }

    async findByName(name: string): Promise<Warehouse | undefined> {
        return await this.findOne({ where: { name: name } })
    }

    async getBy(fieldName: string, fieldValue: any): Promise<Warehouse | undefined> {
        const query = {};
        query[fieldName] = fieldValue;
        return await this.findOne({ where: query });
    }
}

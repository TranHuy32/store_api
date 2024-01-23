import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entity/products.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    async findAll(): Promise<Product[]> {
        return await this.find();
    }

    async findById(id: string): Promise<Product | undefined> {
        return await this.findOne({ where: { id: id } })
    }

    async createProduct(data: Partial<Product>): Promise<Product> {
        const warehouse = this.create(data);
        return await this.save(warehouse);
    }

    async updateById(id: string, data: Partial<Product>): Promise<Product | undefined> {
        await this.update(id, data);
        return this.findOne({ where: { id: id } })
    }

    async deleteById(id: string): Promise<void> {
        await this.delete(id);
    }

    async findByName(name: string): Promise<Product | undefined> {
        return await this.findOne({ where: { name: name } })
    }

    async getBy(fieldName: string, fieldValue: any): Promise<Product | undefined> {
        const query = {};
        query[fieldName] = fieldValue;
        return await this.findOne({ where: query });
    }
}

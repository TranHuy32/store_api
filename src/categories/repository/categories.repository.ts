import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entity/categories.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

    async findAll(): Promise<Category[]> {
        return await this.find();
    }

    async findById(id: string): Promise<Category | undefined> {
        return await this.findOne({ where: { id: id } })
    }

    async createCategory(categoryData: Partial<Category>): Promise<Category> {
        const warehouse = this.create(categoryData);
        return await this.save(warehouse);
    }

    async updateById(id: string, categoryData: Partial<Category>): Promise<Category | undefined> {
        await this.update(id, categoryData);
        return this.findOne({ where: { id: id } })
    }

    async deleteById(id: string): Promise<void> {
        await this.delete(id);
    }

    async findByName(name: string): Promise<Category | undefined> {
        return await this.findOne({ where: { name: name } })
    }

    async getBy(fieldName: string, fieldValue: any): Promise<Category | undefined> {
        const query = {};
        query[fieldName] = fieldValue;
        return await this.findOne({ where: query });
    }
}

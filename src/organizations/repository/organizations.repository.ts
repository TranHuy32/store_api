import { EntityRepository, Repository } from 'typeorm';
import { Organization } from '../entity/organizations.entity';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {

    async findAll(): Promise<Organization[]> {
        return await this.find();
    }

    async findById(id: string): Promise<Organization | undefined> {
        return await this.findOne({ where: { id: id } })
    }

    async createOrganization(data: Partial<Organization>): Promise<Organization> {
        const warehouse = this.create(data);
        return await this.save(warehouse);
    }

    async updateById(id: string, data: Partial<Organization>): Promise<Organization | undefined> {
        await this.update(id, data);
        return this.findOne({ where: { id: id } })
    }

    async deleteById(id: string): Promise<void> {
        await this.delete(id);
    }

    async findByName(name: string): Promise<Organization | undefined> {
        return await this.findOne({ where: { name: name } })
    }

    async getBy(fieldName: string, fieldValue: any): Promise<Organization | undefined> {
        const query = {};
        query[fieldName] = fieldValue;
        return await this.findOne({ where: query });
    }
}

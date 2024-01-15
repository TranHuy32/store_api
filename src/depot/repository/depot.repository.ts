import { EntityRepository, Repository } from 'typeorm';
import { Depot } from '../entity/depot.entity';

@EntityRepository(Depot)
export class DepotRepository extends Repository<Depot> {

    async findAll(): Promise<Depot[]> {
        return await this.find();
    }

    async findDepotById(id: string): Promise<Depot | undefined> {
        return await this.findOne({ where: { ID: id } })
    }

    async createDepot(depotData: Partial<Depot>): Promise<Depot> {
        const depot = this.create(depotData);
        return await this.save(depot);
    }

    async updateDepotById(id: string, depotData: Partial<Depot>): Promise<Depot | undefined> {
        await this.update(id, depotData);
        return this.findOne({ where: { ID: id } })
    }

    async deleteDepotById(id: string): Promise<void> {
        await this.delete(id);
    }

    async findDepotByTenKho(tenKho: string): Promise<Depot | undefined> {
        return await this.findOne({ where: { TenKho: tenKho } })
    }

    async getBy(fieldName: string, fieldValue: any): Promise<Depot | undefined> {
        const query = {};
        query[fieldName] = fieldValue;
        return await this.findOne({ where: query });
    }
}

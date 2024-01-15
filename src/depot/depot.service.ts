import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Depot } from './entity/depot.entity';
import { DepotRepository } from './repository/depot.repository';

@Injectable()
export class DepotService {
    constructor(
        @InjectRepository(Depot)
        private depotRepository: DepotRepository
    ) { }

    async findAll(): Promise<Depot[]> {
        const rs = await this.depotRepository.find();
        return rs
    }

}
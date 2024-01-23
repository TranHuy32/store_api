import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entity/warehouses.entity';
import { WarehouseRepository } from './repository/warehouses.repository';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(Warehouse)
        private warehouseRepository: WarehouseRepository
    ) { }

    async findAll(): Promise<Warehouse[]> {
        const rs = await this.warehouseRepository.find();
        return rs
    }

}
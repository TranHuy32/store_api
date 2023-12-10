import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConcernRepository } from './repository/concerns.repository';
import { Concern } from './entity/concerns.entity';

const moment = require('moment');

@Injectable()
export class ConcernsService {
  constructor(
    @InjectRepository(Concern)
    private concernRepository: ConcernRepository,
  ) {}

  async findAll(): Promise<Concern[]> {
    const rs = await this.concernRepository.find();
    return rs;
  }

  async findByMaDV(maDV: string): Promise<Concern> {
    const concern = await this.concernRepository.findOne({ where: { MaDV: maDV } })
    return concern;
}

async findById(id: string): Promise<Concern> {
    return this.concernRepository.findOne({ where: { ID: id } })
}

async findByTenDV(tenDV: string): Promise<Concern> {
    return this.concernRepository.findOne({ where: { TenDV: tenDV } })
}

async updateConcernById(ID: string, concernData: Partial<Concern>): Promise<Concern | undefined> {
    await this.concernRepository.update(ID, concernData);
    return this.concernRepository.findOne({ where: { ID: ID } })
}
}

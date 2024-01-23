import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entity/organizations.entity';
import { OrganizationRepository } from './repository/organizations.repository';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private organizationRepository: OrganizationRepository
    ) { }

    async findAll(): Promise<Organization[]> {
        const rs = await this.organizationRepository.find();
        return rs
    }

}
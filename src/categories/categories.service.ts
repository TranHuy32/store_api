import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/categories.entity';
import { CategoryRepository } from './repository/categories.repository';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: CategoryRepository
    ) { }

    async findAll(): Promise<Category[]> {
        const rs = await this.categoryRepository.find();
        return rs
    }

}
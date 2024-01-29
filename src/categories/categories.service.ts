import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/categories.entity';
import { CategoryRepository } from './repository/categories.repository';
import CommonError, { ErrorCode } from 'src/common/error/common.error';
import { v4 as uuidv4 } from 'uuid';
import { CreateCategoryDto } from './dto/categories.dto';
import { User } from 'src/users/entity/users.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: CategoryRepository
    ) { }

    async getCategoryOption(category: Category, isDetail: boolean): Promise<any> {
        if (!isDetail) {
            return {
                id: category.id,
                name: category.name,
            }
        }
        return {
            id: category.id,
            name: category.name,
        }
    }

    async findAll(user: User): Promise<{ categories: Category[] }> {
        const categories = (await this.categoryRepository.find()).filter((c) => !!!c.deleted_at);
        const responseCategories = categories.sort((a, b) => a.created_at?.getTime() - b.created_at?.getTime());
        const results = await Promise.all(
            responseCategories.map(async (category) => this.getCategoryOption(category, false)),
        );
        return { categories: results }
    }

    async getCateoryByName(name: string) {
        const category = await this.categoryRepository.findOne({ where: { name } })
        if (!category) {
            return null;
        }
        return category;
    }

    async getCateoryById(id: string) {
        const category = await this.categoryRepository.findOne({ where: { id } })
        if (!category) {
            return null;
        }
        return category;
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
        const category = await this.getCateoryByName(createCategoryDto.name);
        if (category) {
            throw new CommonError(ErrorCode.CATEGORY_EXISTED)
        }
        const categoryCreated = this.categoryRepository.create({ ...createCategoryDto, created_at: new Date(), id: uuidv4() });
        await this.categoryRepository.save(categoryCreated);
        return await this.getCategoryOption(categoryCreated, true)
    }


}
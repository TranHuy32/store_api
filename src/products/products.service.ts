import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/products.entity';
import { ProductRepository } from './repository/products.repository';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: ProductRepository
    ) { }

    async findAll(): Promise<Product[]> {
        const rs = await this.productRepository.find();
        return rs
    }

}
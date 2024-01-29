import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/products.entity';
import { ProductRepository } from './repository/products.repository';
import { User } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import CommonError, { ErrorCode } from 'src/common/error/common.error';
import { CategoryService } from 'src/categories/categories.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: ProductRepository,
        private usersService: UsersService,
        private categoryService: CategoryService,
    ) { }

    async getProductOption(product: Product, isDetail: boolean): Promise<any> {
        console.log(product);
        const category = !!product.category_id ?  await this.categoryService.getCateoryById(product.category_id) : null
        if (!isDetail) {
            return {
                id: product?.id || null,
                name: product?.name || null,
                productCode: product?.product_code || null,
                price: product?.price || null,
                discountRate: product?.discount_rate || null,
                image: product?.image_path || null,
                unit: product?.unit || null,
                remainQuanlity: product?.remain_quantity,
                category: {
                    id: category?.id || null,
                    name: category?.name || null
                }
            }
        }
        return {
            id: product?.id || null,
            name: product?.name || null,
            productCode: product?.product_code || null,
            price: product?.price || null,
            discountRate: product?.discount_rate || null,
            image: product?.image_path || null,
            unit: product?.unit || null,
            remainQuanlity: product?.remain_quantity,
            category: {
                id: category?.id || null,
                name: category?.name || null
            }
        }
    }

    async findAll(user: User, q?: any): Promise<{ products: Product[]; total: number }> {
        const products = (await this.productRepository.find()).filter((p) => !!!p.deleted_at);

        let filteredProducts = products

        if (!!q.search) {
            filteredProducts = filteredProducts.filter((p) => p.name.includes(q.search) || p.product_code.includes(q.search))
        }

        if (q?.isBestSeller === 'true') {
            filteredProducts = filteredProducts.filter((p) => p.is_best_seller == 1)
        }

        if (q?.categoryId) {
            filteredProducts = filteredProducts.filter((p) => p.category_id === q.categoryId)
        }

        let responseProducts = filteredProducts.sort((a, b) => a.created_at?.getTime() - b.created_at?.getTime());

        if (!!q.page && !!q.pageSize) {
            const adjustedPage = +q.page;
            const adjustedPageSize = +q.pageSize;
            const startIndex = (adjustedPage - 1) * adjustedPageSize;
            const endIndex = startIndex + adjustedPageSize;
            responseProducts = responseProducts.slice(startIndex, endIndex);
        }
        const results = await Promise.all(
            responseProducts.map(async (product) => this.getProductOption(product, false)),
        );
        return { products: results, total: filteredProducts.length || 0 }
    }

}
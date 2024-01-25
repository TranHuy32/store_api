import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/products.entity';
import { ProductRepository } from './repository/products.repository';
import { User } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import CommonError, { ErrorCode } from 'src/common/error/common.error';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: ProductRepository,
        private usersService: UsersService
    ) { }

    async findAll(user: User, q?: any
    ): Promise<{ products: Product[]; total: number }> {
        // const existingUser = await this.usersService.getUserById(user.id);
        // if(!!existingUser.deleted_at){
        //     throw new CommonError(ErrorCode.USER_WAS_DELETED )
        // }
        const products = (await this.productRepository.find()).filter((p) => !!!p.deleted_at);
        
        let filteredProducts = products
        
        if (!!q.search) {
            filteredProducts = filteredProducts.filter((p) => p.name.includes(q.search) || p.product_code.includes(q.search))
        }
        
        if (q?.isBestSeller === 'true') {            
            filteredProducts = filteredProducts.filter((p) => p.is_best_seller == 1)
        }

        let responseProducts = filteredProducts.sort((a, b) => a.created_at?.getTime() - b.created_at?.getTime());

        if (!!q.page && !!q.pageSize) {
            const adjustedPage = +q.page;
            const adjustedPageSize = +q.pageSize;
            const startIndex = (adjustedPage - 1) * adjustedPageSize;
            const endIndex = startIndex + adjustedPageSize;
            responseProducts = responseProducts.slice(startIndex, endIndex);
        }     

        return { products: responseProducts , total: filteredProducts.length || 0 }

    }

}
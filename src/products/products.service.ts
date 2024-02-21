import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/products.entity';
import { ProductRepository } from './repository/products.repository';
import { User } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import CommonError, { ErrorCode } from 'src/common/error/common.error';
import { CategoryService } from 'src/categories/categories.service';
import { CreateProductDto } from './dto/create-products.dto';
import { v4 as uuidv4 } from 'uuid';
import { ImageService } from 'src/image/images.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: ProductRepository,
        private usersService: UsersService,
        private categoryService: CategoryService,
        private readonly imageService: ImageService,
    ) { }

    async getProductOption(product: Product, isDetail: boolean): Promise<any> {
        const category = !!product.category_id ? await this.categoryService.getCateoryById(product.category_id) : null
        const image = await this.imageService.findImageById(product.image_id)
        let imageRes = null
        if (!!image) {
            imageRes = await this.imageService.getImageOption(image, true)
        }
        if (!isDetail) {
            return {
                id: product?.id || null,
                name: product?.name || null,
                productCode: product?.product_code || null,
                price: product?.price || null,
                discountRate: product?.discount_rate || null,
                image: imageRes,
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
            image: imageRes,
            unit: product?.unit || null,
            remainQuanlity: product?.remain_quantity,
            category: {
                id: category?.id || null,
                name: category?.name || null
            }
        }
    }

    async getProductById(id: string) {
        const customer = await this.productRepository.findOne({ where: { id } })
        if (!customer) {
            return null;
        }
        return customer;
    }

    async saveProduct(product: any): Promise<any> {
        this.productRepository.save(product)
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

    async createProduct(createProductDto: CreateProductDto, user: User, productImage: Express.Multer.File): Promise<any> {
        const imageProductCreated = await this.imageService.createImage(productImage);
        if (!imageProductCreated) {
            throw new CommonError(ErrorCode.CREATE_IMAGE_FAIL)
        }
        const productCreated = this.productRepository.create({
            id: uuidv4(),
            product_code: createProductDto.productCode,
            name: createProductDto.name,
            price: createProductDto.price,
            discount_rate: createProductDto.discountRate,
            unit: createProductDto.unit,
            note: createProductDto.note,
            category_id: createProductDto.categoryId,
            is_best_seller: 0,
            remain_quantity: createProductDto.remainQuantity,
            image_id: imageProductCreated.id,
            created_at: new Date()
        })
        await this.productRepository.save(productCreated);
        return await this.getProductOption(productCreated, true)
    }

}
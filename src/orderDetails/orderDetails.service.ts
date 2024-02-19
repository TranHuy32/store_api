import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entity/orderDetails.entity';
import { OrderDetailRepository } from './repository/orderDetails.repository';
import { CreateOrderDetailDto } from './dto/orderDetails.dto';
import { v4 as uuidv4 } from 'uuid';
import { ProductService } from 'src/products/products.service';
import CommonError, { ErrorCode } from 'src/common/error/common.error';

@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository: OrderDetailRepository,
        private productService: ProductService
    ) { }

    async getOrderDetailOption(orderDetail: OrderDetail, isDetail: boolean): Promise<any> {
        try {
            if (!!!orderDetail.product_id) {
                throw new CommonError(ErrorCode.PRODUCT_NOT_FOUND)
            }
            const product = await this.productService.getProductById(orderDetail.product_id)
            if (!!!product) {
                throw new CommonError(ErrorCode.PRODUCT_NOT_FOUND)
            }
            const productOption = await this.productService.getProductOption(product, true)
            if (!isDetail) {
                return orderDetail
            }
            return {
                id: orderDetail?.id || null,
                quantity: orderDetail?.quantity || null,
                products: productOption
            }
        } catch (err) {
            console.log("[getOrderDetailOption ERR]", err);
            return
        }

    }

    async findAll(): Promise<OrderDetail[]> {
        const rs = await this.orderDetailRepository.find();
        return rs
    }

    async checkOrderDetail(createOrderDetailDto: CreateOrderDetailDto): Promise<any>{
        if (!!!createOrderDetailDto.productId) {
            console.log("[checkOrderDetail] Invalid productId");
            return false
        }
        const product = await this.productService.getProductById(createOrderDetailDto.productId)
        if (!!!product) {
            console.log("[checkOrderDetail] Invalid product");
            return false
        }
        if(product.remain_quantity < createOrderDetailDto.quantity){
            console.log("[checkOrderDetail] Not enough products");
            return false
        }      
        return true
    }

    async createOrderDetail(createOrderDetailDto: CreateOrderDetailDto): Promise<any> {
            const product = await this.productService.getProductById(createOrderDetailDto.productId)
            product.remain_quantity -= createOrderDetailDto.quantity
            await this.productService.saveProduct(product);
            const orderDetailCreated = this.orderDetailRepository.create({
                ...createOrderDetailDto,
                id: uuidv4(),
                product_id: createOrderDetailDto.productId,
                order_id: createOrderDetailDto.orderId,
                created_at: new Date()
            });
            await this.orderDetailRepository.save(orderDetailCreated);
            return orderDetailCreated
    }
}
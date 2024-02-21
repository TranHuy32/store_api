import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/orders.entity';
import { OrderRepository } from './repository/orders.repository';
import { CreateOrderDto } from './dto/create-orders.dto';
import { CustomerService } from 'src/customers/customers.service';
import CommonError, { ErrorCode } from 'src/common/error/common.error';
import { v4 as uuidv4 } from 'uuid';
import { OrderDetailService } from 'src/orderDetails/orderDetails.service';
import { ProductService } from 'src/products/products.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: OrderRepository,
        private customerService: CustomerService,
        private orderDetailService: OrderDetailService,
        private productService: ProductService
    ) { }

    async getOrderOption(order: Order, isDetail: boolean, orderDetail?: any[]): Promise<any> {
        if (!isDetail) {
            return order
        }
        const customer = await this.customerService.getCustomerById(order.customer_id);

        return {
            id: order?.id || null,
            customer: {
                id: customer?.id || null,
                name: customer?.name || null,
                phonenumber: customer?.phonenumber || null
            },
            products: orderDetail.filter((o) => !!o) || [],
            totalPrice: order?.total_price || null
        }
    }

    async findAll(): Promise<Order[]> {
        const rs = await this.orderRepository.find();
        return rs
    }

    async createOrder(createOrderDto: CreateOrderDto, user: any): Promise<any> {
        let customerId = null
        const customer = await this.customerService.getCustomerById(createOrderDto.customerId);
        if (!!customer) {
            customerId = customer?.id
        }
        const orderCreated = this.orderRepository.create({
            customer_id: customerId,
            staff_id: user.id,
            total_price: createOrderDto.totalPrice,
            created_at: new Date(),
            id: uuidv4()
        });
        let orderDetailsResponse = []
        if (!!createOrderDto?.orderDetail?.length && Array.isArray(createOrderDto.orderDetail)) {
            let validOrder = true
            await Promise.all(
                createOrderDto.orderDetail.map(async (orderDetail) => {
                    const validOrderDetail = await this.orderDetailService.checkOrderDetail({
                        orderId: orderCreated.id,
                        ...orderDetail,
                    });
                    if (!validOrderDetail) {
                        validOrder = false
                    }
                })
            )
            if (!validOrder) {
                throw new CommonError(ErrorCode.CREATE_ORDER_DETAIL_FAIL)
            }
            orderDetailsResponse = await Promise.all(
                createOrderDto.orderDetail.map(async (orderDetail) => {
                    const orderDetailCreated = await this.orderDetailService.createOrderDetail({
                        orderId: orderCreated.id,
                        ...orderDetail,
                    });
                    if (!orderDetailCreated) {
                        return
                    } else {
                        const response = await this.orderDetailService.getOrderDetailOption(orderDetailCreated, true);
                        return response;
                    }
                })
            );
        }
        await this.orderRepository.save(orderCreated);
        return await this.getOrderOption(orderCreated, true, orderDetailsResponse)
    }
}
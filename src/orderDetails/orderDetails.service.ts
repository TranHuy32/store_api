import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entity/orderDetails.entity';
import { OrderDetailRepository } from './repository/orderDetails.repository';

@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository: OrderDetailRepository
    ) { }

    async findAll(): Promise<OrderDetail[]> {
        const rs = await this.orderDetailRepository.find();
        return rs
    }

}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/orders.entity';
import { OrderRepository } from './repository/orders.repository';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: OrderRepository
    ) { }

    async findAll(): Promise<Order[]> {
        const rs = await this.orderRepository.find();
        return rs
    }

}
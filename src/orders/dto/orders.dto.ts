import { CreateOrderDetailDto } from "src/orderDetails/dto/orderDetails.dto";

export class CreateOrderDto {
    customerId: string;
    totalPrice: number;
    staffId: string;
    orderDetail: CreateOrderDetailDto[]
}
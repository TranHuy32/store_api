import { CreateOrderDetailDto } from "src/orderDetails/dto/orderDetails.dto";

export class CreateOrderDto {
    customerId: string;
    totalPrice: string;
    staffId: string;
    orderDetail: CreateOrderDetailDto[]
}
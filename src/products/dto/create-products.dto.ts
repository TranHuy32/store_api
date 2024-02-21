
export class CreateProductDto {
    productCode: string;
    name: string;
    unit: string;
    note: string;
    categoryId: string;
    remainQuantity: number;
    price: number;
    discountRate: number;
}
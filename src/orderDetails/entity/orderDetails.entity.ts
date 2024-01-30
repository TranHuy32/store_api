import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('t_orderDetail')
export class OrderDetail {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    id: string;

    @Column({ type: 'nvarchar', nullable: true })
    order_id: string;

    @Column({ type: 'nvarchar', nullable: true })
    product_id: string;

    @Column({ type: 'int', nullable: true })
    quantity: number;

    @Column({ type: 'int', nullable: true })
    price: number;

    @Column({ type: 'datetime', nullable: true })
    deleted_at: Date;

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at: Date;

}

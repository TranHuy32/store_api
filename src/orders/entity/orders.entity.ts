import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('t_order')
export class Order {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    id: string;

    @Column({ type: 'nvarchar', nullable: true })
    customer_id: string;

    @Column({ type: 'number', nullable: true })
    total_price: string;

    @Column({ type: 'number', nullable: true })
    staff_id: string;

    @Column({ type: 'datetime', nullable: true })
    deleted_at: number;

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at: Date;

}

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('m_product')
export class Product {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    id: string;

    @Column({ type: 'nvarchar', nullable: true })
    product_code: string;

    @Column({ type: 'nvarchar', nullable: true })
    name: string;

    @Column({ type: 'int', nullable: true })
    price: number;

    @Column({ type: 'int', nullable: true })
    discount_rate: number;

    @Column({ type: 'nvarchar', nullable: true })
    unit: string;
    
    @Column({ type: 'nvarchar', nullable: true })
    note: string;

    @Column({ type: 'nvarchar', nullable: true })
    manufacturer_id: string;

    @Column({ type: 'nvarchar', nullable: true })
    category_id: string;

    @Column({ type: 'nvarchar', nullable: true })
    image_path: string;

    @Column({ type: 'bit', nullable: true })
    is_best_seller: number;

    @Column({ type: 'int', nullable: true })
    remain_quantity: number;

    @Column({ type: 'datetime', nullable: true })
    deleted_at: number;

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at: Date;

}

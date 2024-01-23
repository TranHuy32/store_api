import { InUsedStatus } from 'src/common/const.common';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('m_warehouse')
export class Warehouse {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    id: string;

    @Column({ type: 'nvarchar', nullable: true })
    name: string;

    @Column({ type: 'nvarchar', nullable: true })
    address: string;

    @Column({ type: 'nvarchar', nullable: true })
    phone_number: string;

    @Column({ type: 'nvarchar', nullable: true })
    note: string;

    @Column({ type: 'datetime', nullable: true })
    deleted_at: number;

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at: Date;

}

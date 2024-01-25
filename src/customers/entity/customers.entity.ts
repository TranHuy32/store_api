import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('m_customer')
export class Customer {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    id: string;

    @Column({ type: 'nvarchar', nullable: true })
    name: string;

    @Column({ type: 'nvarchar', nullable: true })
    address: string;

    @Column({ type: 'int', nullable: true })
    phonenumber: string;

    @Column({ type: 'nvarchar', nullable: true })
    email: string;

    @Column({ type: 'nvarchar', nullable: true })
    TIN: string;

    @Column({ type: 'datetime', nullable: true })
    deleted_at: number;

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at: Date;

}

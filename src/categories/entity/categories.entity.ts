import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('m_category')
export class Category {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    id: string;

    @Column({ type: 'nvarchar', nullable: true })
    name: string;

    @Column({ type: 'datetime', nullable: true })
    deleted_at: number;

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at: Date;

}

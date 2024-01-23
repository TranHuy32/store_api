import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('m_token')
export class Token {
    @PrimaryColumn({ type: 'nvarchar', length: 100, nullable: false })
    id: string;

    @Column({ type: 'nvarchar', length: 100, nullable: true })
    staff_id: string;

    @Column({ type: 'nvarchar', length: 200, nullable: true })
    access_token: string;

    @Column({ type: 'nvarchar', length: 200, nullable: true })
    refresh_token: string;

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at: Date;

}

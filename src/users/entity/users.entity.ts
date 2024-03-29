import { Entity, Column, PrimaryColumn } from 'typeorm';

const UserStatus = {
    Active: 1,
    Inactive: 0,
};

@Entity('m_staff')
export class User {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    id: string;

    @Column({ type: 'nvarchar', nullable: true })
    username: string;

    @Column({ type: 'nvarchar', nullable: true })
    password: string;

    @Column({ type: 'nvarchar', nullable: true })
    name: string;

    @Column({ type: 'int', nullable: true })
    role: number;
    
    @Column({ type: 'datetime', nullable: true })
    deleted_at: number; 

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;

    @Column({ type: 'datetime', nullable: true })
    updated_at: Date;

}

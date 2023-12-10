import { Entity, Column, PrimaryColumn } from 'typeorm';

const ConcernStatus = {
    Active: 1,
    Inactive: 0,
};

@Entity('DM_DonVi')
export class Concern {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    ID: string;

    @Column({ type: 'nvarchar', nullable: true })
    MaDV: string;

    @Column({ type: 'nvarchar', nullable: true })
    TenDV: string;

    @Column({ type: 'bit', default: ConcernStatus.Active, nullable: true })
    InUsed: number; // 1 là active - 0 là inactive

    @Column({ type: 'datetime', nullable: true })
    EditedOn: Date;
}

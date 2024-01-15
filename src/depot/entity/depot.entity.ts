import { InUsedStatus } from 'src/common/const.common';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('DM_Kho')
export class Depot {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    ID: string;

    @Column({ type: 'nvarchar', nullable: true })
    ID_KhachHang: string;

    @Column({ type: 'nvarchar', nullable: true })
    MaKho: string;

    @Column({ type: 'nvarchar', nullable: true })
    TenKho: string;

    @Column({ type: 'nvarchar', nullable: true })
    DiaChi: string;

    @Column({ type: 'nvarchar', nullable: true })
    DienThoai: string;

    @Column({ type: 'nvarchar', nullable: true })
    GhiChu: string;

    @Column({ type: 'bit', default: InUsedStatus.Active, nullable: true })
    InUsed: number; // 1 là active - 0 là inactive

}

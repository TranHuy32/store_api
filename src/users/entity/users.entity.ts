import { Entity, Column, PrimaryColumn } from 'typeorm';

const UserStatus = {
    Active: 1,
    Inactive: 0,
};

@Entity('dm_NhanVien')
export class User {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    ID: string;

    @Column({ type: 'nvarchar', nullable: true })
    ID_KhachHang: string;

    @Column({ type: 'nvarchar', nullable: true })
    UserName: string;

    @Column({ type: 'nvarchar', nullable: true })
    PassWord: string;

    @Column({ type: 'nvarchar', nullable: true })
    HoTen: string;

    @Column({ type: 'bit', default: UserStatus.Active, nullable: true })
    InUsed: number; // 1 là active - 0 là inactive

    @Column({ type: 'datetime', nullable: true })
    EditedOn: Date;

    @Column({ type: 'int', nullable: true })
    Quyen: number;
}

import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dm_Token')
export class Token {
    @PrimaryColumn({ type: 'nvarchar', length: 100, nullable: false })
    ID: string;

    @Column({ type: 'nvarchar', length: 100, nullable: true })
    UserID: string;

    @Column({ type: 'nvarchar', length: 200, nullable: true })
    AccessToken: string;

    @Column({ type: 'nvarchar', length: 200, nullable: true })
    RefreshToken: string;

    @Column({ type: 'datetime', nullable: true })
    CreatedOn: Date;

    @Column({ type: 'datetime', nullable: true })
    EditedOn: Date;

}

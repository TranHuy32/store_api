import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('m_image')
export class Image {
    @PrimaryColumn({ type: 'nvarchar', nullable: false })
    id: string;

    @Column({ type: 'nvarchar', nullable: true })
    filename: string;

    @Column({ type: 'datetime', nullable: true })
    created_at: Date;
}

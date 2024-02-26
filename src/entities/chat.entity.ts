import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    chat_id: number;

    @Column({ length: 20 })
    chat_type: string;

    @Column({ length: 255, nullable: true })
    chat_name: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}

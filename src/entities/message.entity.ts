import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { Chat } from './chat.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    message_id: number;

    @Column()
    sender_id: number;

    @Column()
    recipient_id: number;

    @Column()
    chat_id: number;

    @Column('text')
    message_text: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'sender_id' })
    sender: Users;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'recipient_id' })
    recipient: Users;

    @ManyToOne(() => Chat)
    @JoinColumn({ name: 'chat_id' })
    chat: Chat;
}

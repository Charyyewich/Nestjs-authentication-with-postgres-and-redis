import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Activities {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public category: string;
  
    @Column()
    public activity: string;
  
  
    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
  }
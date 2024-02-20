import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class ActivityDto {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public category: string;
  
    @Column()
    public activity: string;
  
  
    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
  }
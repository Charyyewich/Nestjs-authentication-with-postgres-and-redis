import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Signup {
    @PrimaryGeneratedColumn()
    public firstname: string;

    @Column()
    public lastname: string;
  
    @Column({ type: 'varchar', length: 120, unique: true })
    public email: string;
  
    @Column({ type: 'varchar' })
    public password: string;
  
    @Column({ nullable: true })
    public confirmpassword: string;
  
  
    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
  }
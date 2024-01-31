import {
    BeforeInsert,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
  @Entity()
  export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({ nullable: false, unique: true })
    email: string;
  
    @Column({ nullable: false })
    password: string;
  
    @BeforeInsert()
    async hashPasword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  
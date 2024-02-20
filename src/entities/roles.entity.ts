import {
  Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Users } from './users.entity';

  @Entity()
  export class Roles {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    role: string;

    // @ManyToMany(
    //   type => Users, 
    //   users => users.roles)
    // roles: Users[];
  }
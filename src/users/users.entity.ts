import { Transform } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column({ type: 'bigint' })
  @Transform(({ value }) => Number(value))
  createdAt: number;

  @Column({ type: 'bigint' })
  @Transform(({ value }) => Number(value))
  updatedAt: number;
}

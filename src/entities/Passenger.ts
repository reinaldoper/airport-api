import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @Column()
  documentoIdentidade?: string;

  @Column()
  email?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;
}

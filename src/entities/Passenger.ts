import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @Column({ nullable: true, unique: true })
  documentoIdentidade?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;
}

import { Plane } from './Plane';
import { Airport } from './Airport';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export type CashFlowType = 'income' | 'expense';

@Entity()
export class CashFlow {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  description?: string;

  @Column({
    type: 'text',
  })
  type?: CashFlowType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount?: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @ManyToOne(() => Plane, { onDelete: "CASCADE" })
  @JoinColumn({ name: "planeId" })
  plane?: Plane;

  @Column()
  planeId?: number;

  @ManyToOne(() => Airport, { onDelete: "CASCADE" })
  @JoinColumn({ name: "airportId" })
  airport?: Airport;

  @Column()
  airportId?: number;
}

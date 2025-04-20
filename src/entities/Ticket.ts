import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Passenger } from './Passenger';
import { Flight } from './Flight';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  assento?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco?: number;

  @CreateDateColumn({ type: 'datetime' })
  dataCompra?: Date;

  @ManyToOne(() => Passenger)
  passageiro?: Passenger;

  @ManyToOne(() => Flight)
  voo?: Flight;
}

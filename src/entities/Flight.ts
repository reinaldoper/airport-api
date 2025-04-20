import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Plane } from './Plane';
import { Airport } from './Airport';

export type FlightStatus = 'programado' | 'em_andamento' | 'concluido' | 'cancelado';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Airport)
  origem?: Airport;

  @ManyToOne(() => Airport)
  destino?: Airport;

  @Column('datetime')
  dataHoraPartida?: Date;

  @Column('datetime')
  dataHoraChegada?: Date;

  @Column({
    type: 'text',
    default: 'programado',
  })
  status?: FlightStatus;

  @CreateDateColumn({ type: 'datetime' })
  registradoEm?: Date;

  @ManyToOne(() => Plane, { eager: true })
  plane?: Plane;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Plane } from './Plane';
import { Airport } from './Airport';

export type FlightStatus = 'programado' | 'em_andamento' | 'concluido' | 'cancelado';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Airport)
  @JoinColumn({ name: 'origemId' })
  origem?: Airport;

  @Column()
  origemId?: number;

  @ManyToOne(() => Airport)
  @JoinColumn({ name: 'destinoId' })
  destino?: Airport;

  @Column()
  destinoId?: number;

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
  @JoinColumn({ name: 'planeId' })
  plane?: Plane;

  @Column()
  planeId?: number;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { Plane } from './Plane';
import { CashFlow } from './CashFlow';

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @Column()
  cidade?: string;

  @Column()
  estado?: string;

  @Column()
  codigoIATA?: string; 

  @CreateDateColumn({ type: 'datetime' })
  criadoEm?: Date;

  @ManyToMany(() => Plane, (plane) => plane.airports)
  planes?: Plane[];

  @Column({ nullable: true })
  planeId?: number;

  @OneToMany(() => CashFlow, (cashFlow) => cashFlow.airport)
  cashFlows?: CashFlow[];

  @Column({ nullable: true })
  cashFlowId?: number;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
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
  @JoinTable()
  planes?: Plane[];

  @OneToMany(() => CashFlow, (cashFlow) => cashFlow.airport)
  cashFlows?: CashFlow[];

}

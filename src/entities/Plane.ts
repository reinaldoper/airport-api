import { CashFlow } from "./CashFlow";
import { Airport } from "./Airport";
import { Passenger } from "./Passenger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany } from "typeorm";

export type PlaneStatus = "operante" | "manutencao" | "fora_servico";

@Entity()
export class Plane {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  modelo?: string;

  @Column()
  anoFabricacao?: number;

  @Column()
  capacidade?: number;

  @Column("decimal")
  valorCompra?: number;

  @Column({
    type: "text",
    default: "operante",
  })
  status?: PlaneStatus;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @OneToMany(() => CashFlow, (cashFlow) => cashFlow.plane)
  cashFlows?: CashFlow[];

  @ManyToMany(() => Airport, (airport) => airport.planes)
  airports?: Airport[];

  @Column({ nullable: true })
  airportId?: number;

  @OneToMany(() => Passenger, (passenger) => passenger.planes)
  passengers?: Passenger[];

}

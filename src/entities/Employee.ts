import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type EmployeeRole = 'piloto' | 'comissario' | 'tecnico' | 'atendente';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @Column({ nullable: true, unique: true })
  matricula?: string;

  @Column({
    type: 'text',
  })
  funcao?: EmployeeRole;

  @CreateDateColumn({ type: 'datetime' })
  contratadoEm?: Date;
}


import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Plane } from './Plane';

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

  @ManyToOne(() => Plane, (plane) => plane.passengers)
  planes?: Plane;

  @Column({ nullable: true })
  planeId?: number;

}

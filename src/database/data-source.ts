import "reflect-metadata";
import { DataSource } from "typeorm";
import { Plane } from "../entities/Plane";
import { CashFlow } from "../entities/CashFlow";
import { Airport } from "../entities/Airport";
import { Flight } from "../entities/Flight";
import { Passenger } from "../entities/Passenger";
import { Ticket } from "../entities/Ticket";
import { Employee } from "../entities/Employee";



const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: isProd ? '/tmp/database.sqlite' : './src/database.sqlite',
  entities: [Airport, Flight, Plane, Ticket, Passenger, Employee, CashFlow],
  synchronize: true,
});
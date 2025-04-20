import "reflect-metadata";
import { DataSource } from "typeorm";
import { Plane } from "../entities/Plane";
import { CashFlow } from "../entities/CashFlow";
import { Airport } from "../entities/Airport";
import { Flight } from "../entities/Flight";
import { Passenger } from "../entities/Passenger";
import { Ticket } from "../entities/Ticket";
import { Employee } from "../entities/Employee";



export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/airport.sqlite",
  synchronize: true,
  logging: false,
  entities: [Plane, CashFlow, Airport, Flight, Passenger, Ticket, Employee],
  migrations: [],
  subscribers: [],
});
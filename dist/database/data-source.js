"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Plane_1 = require("../entities/Plane");
const CashFlow_1 = require("../entities/CashFlow");
const Airport_1 = require("../entities/Airport");
const Flight_1 = require("../entities/Flight");
const Passenger_1 = require("../entities/Passenger");
const Ticket_1 = require("../entities/Ticket");
const Employee_1 = require("../entities/Employee");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./src/database/airport.sqlite",
    synchronize: true,
    logging: false,
    entities: [Plane_1.Plane, CashFlow_1.CashFlow, Airport_1.Airport, Flight_1.Flight, Passenger_1.Passenger, Ticket_1.Ticket, Employee_1.Employee],
    migrations: [],
    subscribers: [],
});

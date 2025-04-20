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
const isProd = process.env.NODE_ENV === 'production';
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: isProd ? '/tmp/database.sqlite' : './src/database.sqlite',
    entities: [Airport_1.Airport, Flight_1.Flight, Plane_1.Plane, Ticket_1.Ticket, Passenger_1.Passenger, Employee_1.Employee, CashFlow_1.CashFlow],
    synchronize: true,
});

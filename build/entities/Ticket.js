"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const typeorm_1 = require("typeorm");
const Passenger_1 = require("./Passenger");
const Flight_1 = require("./Flight");
let Ticket = class Ticket {
};
exports.Ticket = Ticket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ticket.prototype, "assento", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Ticket.prototype, "preco", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Ticket.prototype, "dataCompra", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Passenger_1.Passenger, { onDelete: "CASCADE" }),
    __metadata("design:type", Passenger_1.Passenger)
], Ticket.prototype, "passageiro", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Flight_1.Flight, { onDelete: "CASCADE" }),
    __metadata("design:type", Flight_1.Flight)
], Ticket.prototype, "voo", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)()
], Ticket);

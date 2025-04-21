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
exports.Airport = void 0;
const typeorm_1 = require("typeorm");
const Plane_1 = require("./Plane");
const CashFlow_1 = require("./CashFlow");
let Airport = class Airport {
};
exports.Airport = Airport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Airport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "cidade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Airport.prototype, "codigoIATA", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Airport.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Plane_1.Plane, (plane) => plane.airports),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Airport.prototype, "planes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CashFlow_1.CashFlow, (cashFlow) => cashFlow.airport),
    __metadata("design:type", Array)
], Airport.prototype, "cashFlows", void 0);
exports.Airport = Airport = __decorate([
    (0, typeorm_1.Entity)()
], Airport);

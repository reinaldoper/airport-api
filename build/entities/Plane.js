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
exports.Plane = void 0;
const CashFlow_1 = require("./CashFlow");
const Airport_1 = require("./Airport");
const typeorm_1 = require("typeorm");
let Plane = class Plane {
};
exports.Plane = Plane;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Plane.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Plane.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Plane.prototype, "anoFabricacao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Plane.prototype, "capacidade", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], Plane.prototype, "valorCompra", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        default: "operante",
    }),
    __metadata("design:type", String)
], Plane.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Plane.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CashFlow_1.CashFlow, (cashFlow) => cashFlow.plane),
    __metadata("design:type", Array)
], Plane.prototype, "cashFlows", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Airport_1.Airport, (airport) => airport.planes),
    __metadata("design:type", Array)
], Plane.prototype, "airports", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Plane.prototype, "airportId", void 0);
exports.Plane = Plane = __decorate([
    (0, typeorm_1.Entity)()
], Plane);

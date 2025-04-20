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
exports.CashFlow = void 0;
const Plane_1 = require("./Plane");
const Airport_1 = require("./Airport");
const typeorm_1 = require("typeorm");
let CashFlow = class CashFlow {
};
exports.CashFlow = CashFlow;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CashFlow.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CashFlow.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], CashFlow.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], CashFlow.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], CashFlow.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Plane_1.Plane, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "planeId" }),
    __metadata("design:type", Plane_1.Plane)
], CashFlow.prototype, "plane", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CashFlow.prototype, "planeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Airport_1.Airport, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "airportId" }),
    __metadata("design:type", Airport_1.Airport)
], CashFlow.prototype, "airport", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CashFlow.prototype, "airportId", void 0);
exports.CashFlow = CashFlow = __decorate([
    (0, typeorm_1.Entity)()
], CashFlow);

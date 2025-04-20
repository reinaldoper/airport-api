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
exports.Flight = void 0;
const typeorm_1 = require("typeorm");
const Plane_1 = require("./Plane");
const Airport_1 = require("./Airport");
let Flight = class Flight {
};
exports.Flight = Flight;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Flight.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Airport_1.Airport),
    __metadata("design:type", Airport_1.Airport)
], Flight.prototype, "origem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Airport_1.Airport),
    __metadata("design:type", Airport_1.Airport)
], Flight.prototype, "destino", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], Flight.prototype, "dataHoraPartida", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime'),
    __metadata("design:type", Date)
], Flight.prototype, "dataHoraChegada", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'programado',
    }),
    __metadata("design:type", String)
], Flight.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Flight.prototype, "registradoEm", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Plane_1.Plane, { eager: true }),
    __metadata("design:type", Plane_1.Plane)
], Flight.prototype, "plane", void 0);
exports.Flight = Flight = __decorate([
    (0, typeorm_1.Entity)()
], Flight);

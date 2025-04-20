"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketSchema = void 0;
const zod_1 = require("zod");
exports.ticketSchema = zod_1.z.object({
    assento: zod_1.z.string().min(1, 'Assento é obrigatório'),
    preco: zod_1.z.number().positive('Preço deve ser positivo'),
    passageiroId: zod_1.z.number().int().positive('ID do passageiro é obrigatório'),
    vooId: zod_1.z.number().int().positive('ID do voo é obrigatório'),
});

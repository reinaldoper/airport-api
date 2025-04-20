"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passengerSchema = void 0;
const zod_1 = require("zod");
exports.passengerSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, 'Nome é obrigatório'),
    documentoIdentidade: zod_1.z.string().min(1, 'Documento de identidade é obrigatório'),
    email: zod_1.z.string().email('Email inválido'),
});

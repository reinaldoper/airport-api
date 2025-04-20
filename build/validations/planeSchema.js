"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planeSchema = void 0;
const zod_1 = require("zod");
exports.planeSchema = zod_1.z.object({
    modelo: zod_1.z.string().min(3, 'Modelo deve ter ao menos 3 caracteres'),
    anoFabricacao: zod_1.z.number().min(2, 'anoFabricacao deve ser maior que 2'),
    capacidade: zod_1.z.number().min(2, 'Capacidade deve ter ao menos 2 lugares'),
    valorCompra: zod_1.z
        .number()
        .min(3, 'Valor compra deve ser maior que 3')
});

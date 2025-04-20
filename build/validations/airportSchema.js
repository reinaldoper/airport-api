"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airportSchema = void 0;
const zod_1 = require("zod");
exports.airportSchema = zod_1.z.object({
    nome: zod_1.z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
    cidade: zod_1.z.string().min(2, 'Cidade deve ter ao menos 2 caracteres'),
    estado: zod_1.z.string().min(2, 'Estado deve ter ao menos 2 caracteres'),
    codigoIATA: zod_1.z
        .string()
        .length(3, 'Código IATA deve ter exatamente 3 letras')
        .regex(/^[A-Z]{3}$/, 'Código IATA deve conter apenas letras maiúsculas'),
});

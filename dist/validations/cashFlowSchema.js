"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashFlowSchema = void 0;
const zod_1 = require("zod");
exports.cashFlowSchema = zod_1.z.object({
    description: zod_1.z.string().min(1, 'Descrição é obrigatória'),
    type: zod_1.z.enum(['income', 'expense'], {
        required_error: 'O tipo deve ser "income" ou "expense"',
    }),
    amount: zod_1.z
        .number({
        required_error: 'Valor é obrigatório',
        invalid_type_error: 'Valor deve ser um número',
    })
        .positive('Valor deve ser positivo'),
    planeId: zod_1.z
        .number({
        required_error: 'O ID do avião é obrigatório',
        invalid_type_error: 'planeId deve ser um número',
    })
        .int()
        .positive('planeId deve ser um número positivo'),
    airportId: zod_1.z
        .number({
        required_error: 'O ID do aeroporto é obrigatório',
        invalid_type_error: 'airportId deve ser um número',
    })
        .int()
        .positive('airportId deve ser um número positivo'),
});

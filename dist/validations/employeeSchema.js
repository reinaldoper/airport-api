"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSchema = void 0;
const zod_1 = require("zod");
exports.employeeSchema = zod_1.z.object({
    nome: zod_1.z.string({
        required_error: 'Nome é obrigatório',
    }),
    matricula: zod_1.z.string({
        required_error: 'Matrícula é obrigatória',
    }),
    funcao: zod_1.z.enum(['piloto', 'comissario', 'tecnico', 'atendente'], {
        required_error: 'Função é obrigatória',
        invalid_type_error: 'Função inválida',
    }),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightSchema = void 0;
const zod_1 = require("zod");
exports.flightSchema = zod_1.z.object({
    origem: zod_1.z.number({ required_error: 'ID do aeroporto de origem é obrigatório' }),
    destino: zod_1.z.number({ required_error: 'ID do aeroporto de destino é obrigatório' }),
    dataHoraPartida: zod_1.z.string({ required_error: 'Data e hora da partida são obrigatórias' }),
    dataHoraChegada: zod_1.z.string({ required_error: 'Data e hora da chegada são obrigatórias' }),
    status: zod_1.z.enum(['programado', 'em_andamento', 'concluido', 'cancelado']).optional(),
    plane: zod_1.z.number({ required_error: 'ID do avião é obrigatório' }),
});

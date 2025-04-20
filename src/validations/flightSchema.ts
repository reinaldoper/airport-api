
import { z } from 'zod';

export const flightSchema = z.object({
  origem: z.number({ required_error: 'ID do aeroporto de origem é obrigatório' }),
  destino: z.number({ required_error: 'ID do aeroporto de destino é obrigatório' }),
  dataHoraPartida: z.string({ required_error: 'Data e hora da partida são obrigatórias' }),
  dataHoraChegada: z.string({ required_error: 'Data e hora da chegada são obrigatórias' }),
  status: z.enum(['programado', 'em_andamento', 'concluido', 'cancelado']).optional(),
  plane: z.number({ required_error: 'ID do avião é obrigatório' }),
});

import { z } from 'zod';

export const cashFlowSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  type: z.enum(['income', 'expense'], {
    required_error: 'O tipo deve ser "income" ou "expense"',
  }),
  amount: z
    .number({
      required_error: 'Valor é obrigatório',
      invalid_type_error: 'Valor deve ser um número',
    })
    .positive('Valor deve ser positivo'),
  planeId: z
    .number({
      required_error: 'O ID do avião é obrigatório',
      invalid_type_error: 'planeId deve ser um número',
    })
    .int()
    .positive('planeId deve ser um número positivo'),
  airportId: z
    .number({
      required_error: 'O ID do aeroporto é obrigatório',
      invalid_type_error: 'airportId deve ser um número',
    })
    .int()
    .positive('airportId deve ser um número positivo'),
});

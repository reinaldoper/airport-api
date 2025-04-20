import { z } from 'zod';

export const ticketSchema = z.object({
  assento: z.string().min(1, 'Assento é obrigatório'),
  preco: z.number().positive('Preço deve ser positivo'),
  passageiroId: z.number().int().positive('ID do passageiro é obrigatório'),
  vooId: z.number().int().positive('ID do voo é obrigatório'),
});

import { z } from 'zod';

export const passengerSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  documentoIdentidade: z.string().min(1, 'Documento de identidade é obrigatório'),
  email: z.string().email('Email inválido'),
  planeId: z.number().min(1, 'ID do avião é obrigatório'),
});

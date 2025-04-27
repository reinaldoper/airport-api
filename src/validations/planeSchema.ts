
import { z } from 'zod';

export const planeSchema = z.object({
  modelo: z.string().min(3, 'Modelo deve ter ao menos 3 caracteres'),
  anoFabricacao: z.number().min(2, 'anoFabricacao deve ser maior que 2'),
  capacidade: z.number().min(2, 'Capacidade deve ter ao menos 2 lugares'),
  valorCompra: z
    .number()
    .min(3, 'Valor compra deve ser maior que 3'),
  status: z.string().optional(),
});
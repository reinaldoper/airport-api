
import { z } from 'zod';

export const airportSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  cidade: z.string().min(2, 'Cidade deve ter ao menos 2 caracteres'),
  estado: z.string().min(2, 'Estado deve ter ao menos 2 caracteres'),
  codigoIATA: z
    .string()
    .length(3, 'Código IATA deve ter exatamente 3 letras')
    .regex(/^[A-Z]{3}$/, 'Código IATA deve conter apenas letras maiúsculas'),
});

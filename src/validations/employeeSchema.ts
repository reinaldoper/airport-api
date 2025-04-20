
import { z } from 'zod';

export const employeeSchema = z.object({
  nome: z.string({
    required_error: 'Nome é obrigatório',
  }),
  matricula: z.string({
    required_error: 'Matrícula é obrigatória',
  }),
  funcao: z.enum(['piloto', 'comissario', 'tecnico', 'atendente'], {
    required_error: 'Função é obrigatória',
    invalid_type_error: 'Função inválida',
  }),
});


import { Request, Response } from 'express';
import { flightSchema } from '../validations/flightSchema';
import { createFlight, 
  deleteFlight, 
  getAllFlights, 
  getFlightById, 
  getFlightByAirportId, 
  updateFlight,
  FlightData
} from '../services/createFlight';

/**
 * @description Obtém todos os voos
 * @param _ Request do Express (n o   utilizado)
 * @param res Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com a lista de voos se bem-sucedido
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os voos
 */
export const getAllFlight = async (_: Request, res: Response): Promise<FlightData | any> => {
  const flights = await getAllFlights();
  return res.status(200).json({ message: 'Lista de voos', data: flights });
  
};

/**
 * @description Obtém um voo pelo ID
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o voo encontrado se bem-sucedido
 * @throws {Error} - Erro 404 se o voo não for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar o voo
 */
export const getFlightByIds = async (req: Request, res: Response): Promise<FlightData | any> => {
  const id = Number(req.params.id);
    try {
      const flight = await getFlightById(id);
      return res.status(200).json({ message: 'Voo obtido com sucesso', data: flight });
      
    } catch (error) {
      if (error instanceof Error && error.message === 'Voo não encontrado') {
        return res.status(404).json({ error: 'Voo não encontrado' });
      }
      return res.status(500).json({ error: 'Erro ao buscar voo'});
      
    }
  };



/**
 * @description Cria um novo voo com os dados fornecidos.
 * @param {Request} req - Requisição do Express contendo os dados do voo no corpo.
 * @param {Response} res - Resposta do Express para enviar o resultado.
 * @returns {Promise<FlightData | any>} - Promise com o voo criado se bem-sucedido.
 * @throws {Error} - Erro 400 se o corpo da requisição for inválido.
 * @throws {Error} - Erro 500 caso ocorra um erro ao criar o voo.
 */

export const createFlights = async (req: Request, res: Response): Promise<FlightData | any> => {
  const validation = flightSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }
  try {
    const { origem, destino, dataHoraPartida, dataHoraChegada, status, plane } = req.body;
    const newFlight = await createFlight({ origem, destino, dataHoraPartida, dataHoraChegada, status, plane });
    return res.status(201).json({ message: 'Voo criado com sucesso', data: newFlight });
    
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao criar voo' });  
  }
};

  /**
   * Atualiza um voo existente.
   * @param {Request} req - Requisi o do Express com o par metro ID
   * @param {Response} res - Resposta do Express para enviar o resultado
   * @returns {Promise<FlightData | any>} - Promise com o voo atualizado se bem-sucedido
   * @throws {Error} - Erro 400 se o corpo da requisi o for inv lido
   * @throws {Error} - Erro 404 se o voo n o for encontrado
   * @throws {Error} - Erro 500 caso ocorra um erro ao atualizar o voo
   */
export const updateFlights = async (req: Request, res: Response): Promise<FlightData | any> => {
  const id = Number(req.params.id);
  const validation = flightSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }
  try {
    const { origem, destino, dataHoraPartida, dataHoraChegada, status, plane } = req.body;
    const updatedFlight = await updateFlight(id, { origem, destino, dataHoraPartida, dataHoraChegada, status, plane });
    return res.status(200).json({ message: 'Voo atualizado com sucesso', data: updatedFlight });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao atualizar voo' });
  } 
};

  /**
   * @description Exclui um voo
   * @param req Request do Express contendo o parâmetro ID do voo
   * @returns Status 200 com uma mensagem de sucesso e o voo excluído
   * @throws Error 404 se o voo n o for encontrado
   * @throws Error 500 caso ocorra um erro ao excluir o voo
   */
export const deleteFlights = async (req: Request, res: Response): Promise<FlightData | any> => {
  const id = Number(req.params.id);
  try {
    const deletedFlight = await deleteFlight(id);
    return res.status(200).json({ message: 'Voo excluido com sucesso', data: deletedFlight });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao excluir voo' });
  }
};

  /**
   * @description Obtém um voo por ID do aeroporto
   * @param req Request do Express contendo o parâmetro ID do aeroporto
   * @param res Response do Express para enviar o resultado
   * @returns Status 200 com os dados do voo se encontrado
   * @throws Error 400 se o parâmetro ID for inválido
   * @throws Error 404 se o voo não for encontrado
   * @throws Error 500 caso ocorra um erro ao buscar o voo
   */
export const getFlightByAirport = async (req: Request, res: Response): Promise<FlightData | any> => {
  const id = Number(req.params.id);
  try {
    const flight = await getFlightByAirportId(id);
    return res.status(200).json({ message: 'Voo obtido com sucesso', data: flight });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao buscar voo' });
  }
};

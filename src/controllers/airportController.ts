
import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Airport } from '../entities/Airport';
import { airportSchema } from '../validations/airportSchema';
import { createAirport, 
  updateAirport, 
  deleteAirport, 
  getAirportById,
  getAirports,
  getAirportByIdWithPlanesAndCashFlows,
  CreateAirportParams
} from '../services/createAirport';

const airportRepository = AppDataSource.getRepository(Airport);


  /**
   * @description Cria um novo aeroporto
   * @param nome Nome do aeroporto
   * @param cidade Cidade do aeroporto
   * @param estado Estado do aeroporto
   * @param codigoIATA C digo IATA do aeroporto
   * @returns Status 201 com o aeroporto criado
   * @throws Error 400 se o aeroporto j  existe com o mesmo c digo IATA
   * @throws Error 500 caso ocorra um erro ao criar o aeroporto
   */
export const createAirports = async (req: Request, res: Response): Promise<CreateAirportParams | any> => {
  const parse = airportSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({ errors: parse.error.flatten().fieldErrors });
  }

  const { nome, cidade, estado, codigoIATA } = parse.data;

  try {
    const criadoEm = new Date();
    const airportExists = await airportRepository.findOneBy({ codigoIATA });
    if (airportExists) {
      return res.status(400).json({ error: 'Aeroporto já existe com esse código IATA' });
    }
    const airport = await createAirport({ nome, cidade, estado, codigoIATA, criadoEm });
    if (!airport) {
      return res.status(400).json({ error: 'Erro ao criar aeroporto' });
    }
    await airportRepository.save(airport);
    return res.status(201).json({ message: 'Aeroporto criado com sucesso', data: airport });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar aeroporto'});
  }
};


  /**
   * @description Atualiza um aeroporto
   * @param id ID do aeroporto
   * @param nome Nome do aeroporto
   * @param cidade Cidade do aeroporto
   * @param estado Estado do aeroporto
   * @param codigoIATA C digo IATA do aeroporto
   * @returns Status 200 com o aeroporto atualizado
   * @throws Error 400 se o aeroporto j  existe com o mesmo c digo IATA
   * @throws Error 404 se o aeroporto n o for encontrado
   * @throws Error 500 caso ocorra um erro ao atualizar o aeroporto
   */
export const updateAirports = async (req: Request, res: Response): Promise<CreateAirportParams | any> => {
  const { id } = req.params;
  const parse = airportSchema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten().fieldErrors });
  }
  const { nome, cidade, estado, codigoIATA } = parse.data;
  const criadoEm = new Date();
  try {
    const airport = await updateAirport(Number(id), { nome, cidade, estado, codigoIATA, criadoEm });
    return res.status(200).json({ message: 'Aeroporto atualizado com sucesso', airport });
  } catch (error) {
    if (error instanceof Error && error.message === 'Aeroporto já existe com esse código IATA') {
      return res.status(400).json({ error: 'Aeroporto já existe com esse código IATA' });
    }
    if (error instanceof Error && error.message === 'Airport not found') {
      return res.status(404).json({ error: 'Aeroporto não encontrado' });
    }
    return res.status(500).json({ error: 'Erro ao atualizar aeroporto' });
  }
};

  /**
   * @description Deleta um aeroporto
   * @param id ID do aeroporto a ser deletado
   * @returns Status 200 com uma mensagem de sucesso
   * @throws Error 404 se o aeroporto n o for encontrado
   * @throws Error 500 caso ocorra um erro ao deletar o aeroporto
   */
export const deleteAirports = async (req: Request, res: Response): Promise<CreateAirportParams | any> => {
  try {
    const { id } = req.params;

    await deleteAirport(Number(id));

    return res.json({ message: 'Aeroporto deletado com sucesso' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Airport not found') {
      return res.status(404).json({ error: 'Aeroporto não encontrado' });
    }
    return res.status(500).json({ error: 'Erro ao deletar aeroporto' });
  }
};

/**
 * @description Obtém um aeroporto pelo ID
 * @param req Request do Express contendo o parâmetro ID
 * @param res Response do Express para enviar o resultado
 * @returns Status 200 com os dados do aeroporto se encontrado
 * @throws Error 404 se o aeroporto não for encontrado
 * @throws Error 500 caso ocorra um erro ao buscar o aeroporto
 */

export const getAirportByIds = async (req: Request, res: Response): Promise<CreateAirportParams | any> => {
  try {
    const { id } = req.params;
    const airport = await getAirportById(Number(id));
    return res.status(200).json({ message: 'Aeroporto obtido com sucesso', data: airport });
  } catch (error) {
    if (error instanceof Error && error.message === 'Airport not found') {
      return res.status(404).json({ error: 'Aeroporto não encontrado' });
    }
    return res.status(500).json({ error: 'Erro ao buscar aeroporto' });
  }
};

/**
 * @description Obtém todos os aeroportos
 * @param _req Request do Express (não utilizado)
 * @param res Response do Express para enviar o resultado
 * @returns Status 200 com a lista de aeroportos se bem-sucedido
 * @throws Error 500 caso ocorra um erro ao buscar os aeroportos
 */

export const getAllAirports = async (_req: Request, res: Response): Promise<CreateAirportParams | any> => {
  try {
    const airports = await getAirports();
    return res.status(200).json({ message: 'Aeroportos obtidos com sucesso', data: airports });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar aeroportos' });
  }
};

/**
 * @description Obtém um aeroporto pelo ID, com seus avi es e fluxos de caixa
 * @param req Request do Express contendo o parâmetro ID
 * @param res Response do Express para enviar o resultado
 * @returns Status 200 com os dados do aeroporto se encontrado
 * @throws Error 404 se o aeroporto não for encontrado
 * @throws Error 500 caso ocorra um erro ao buscar o aeroporto
 */
export const getAirportByIdWithPlanesAndCashFlow = async (req: Request, res: Response): Promise<CreateAirportParams | any> => {
  try {
    const { id } = req.params;
    const airport = await getAirportByIdWithPlanesAndCashFlows(Number(id));
    return res.status(200).json({ message: 'Aeroporto obtido com sucesso', data: airport });
  } catch (error) {
    if (error instanceof Error && error.message === 'Airport not found') {
      return res.status(404).json({ error: 'Aeroporto não encontrado' });
    }
    return res.status(500).json({ error: 'Erro ao buscar aeroporto' });
  }
};
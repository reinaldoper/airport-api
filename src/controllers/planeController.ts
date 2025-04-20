import { Request, Response } from "express";
import { createPlane, getPlanes, getPlaneById, updatePlane, deletePlane } from "../services/createAirPlane";
import { planeSchema } from "../validations/planeSchema";


/**
 * @description Cria um avião
 * @param {Request} req - Request do Express contendo os dados do avião
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o avião criado
 * @throws {Error} - Erro 500 caso ocorra um erro ao criar o avião
 */
export const createPlaneController = async (req: Request, res: Response): Promise<any> => {
  const result = planeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }
  const { modelo, anoFabricacao, capacidade, valorCompra } = req.body;
  try {
    const plane = await createPlane({ modelo, anoFabricacao, capacidade, valorCompra });
    return res.status(201).json({ message: "Avião criado com sucesso", data: plane });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro ao criar avião" });
  }
};

/**
 * @description Obtém todos os avi es
 * @param {Request} req - Request do Express (n o   utilizado)
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com a lista de avi es se bem-sucedido
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os avi es
 */
export const getPlanesController = async (req: Request, res: Response): Promise<any> => {
  try {
    const planes = await getPlanes();
    return res.status(200).json({ message: "Avioes obtidos com sucesso", data: planes });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro ao obter avioes" });
  }
};

/**
 * @description Obtém um avião pelo ID
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o avião pelo ID
 * @throws {Error} - Erro 404 se o avião n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar o avião
 */
export const getPlaneByIdController = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const plane = await getPlaneById(Number(id));
    return res.status(200).json({ message: "Avião obtido com sucesso", data: plane });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro ao obter avião por ID" });
  }
};
/**
 * @description Atualiza um avião
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o avião atualizado
 * @throws {Error} - Erro 404 se o avião n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao atualizar o avião
 */
export const updatePlaneController = async (req: Request, res: Response): Promise<any> => {
  const result = planeSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }
  const { id } = req.params;
  const { modelo, anoFabricacao, capacidade, valorCompra } = req.body;
  try {
    const plane = await updatePlane(Number(id), { modelo, anoFabricacao, capacidade, valorCompra });
    return res.status(200).json({ message: "Avião atualizado com sucesso", data: plane });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro ao atualizar avião" });
  }
};

/**
 * @description Exclui um avião
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o avião excluído
 * @throws {Error} - Erro 404 se o avião n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao excluir o avião
 */
export const deletePlaneController = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const plane = await deletePlane(Number(id));
    return res.status(200).json({ message: "Avião excluído com sucesso", data: plane });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro ao excluir avião" });
  }
};


import { Request, Response } from 'express';

import { createCashFlow,
   getCashFlowHistory, 
   getCashFlowById, 
   deleteCashFlow,
   updateCashFlow,
   deleteAllCashFlows,
   CreateCashFlowParams
  } from '../services/createCashFlow';
  import { cashFlowSchema } from '../validations/cashFlowSchema';

/**
 * @description Create a cash flow report
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<any>} - Promise with the created cash flow report
 */
export const createCashFlowReport = async (req: Request, res: Response): Promise<CreateCashFlowParams | any> => {
  const parse = cashFlowSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ errors: parse.error.flatten().fieldErrors });
  }
  const { description, amount, type, planeId } = req.body;
  try {
    const repoService = await createCashFlow({ description, amount, type, planeId });
    if (!repoService) {
      return res.status(404).json({ error: 'Fluxo de caixa não encontrado' });
    }
    return res.status(201).json({ message: 'Fluxo de caixa criado com sucesso', data: repoService });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao gerar relatório de fluxo de caixa' });
  }
}
/**
 * @description Get the cash flow history
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<any>} - Promise with the cash flow history
 */
export async function getCashFlowHistoryController(req: Request, res: Response): Promise<CreateCashFlowParams | any> {
  try {
    const repoService = await getCashFlowHistory();
    return res.status(200).json({ message: 'Fluxo de caixa obtido com sucesso', data: repoService });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao obter histórico de fluxo de caixa' });
  }
}

/**
 * @description Get a cash flow by ID
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<CreateCashFlowParams | any>} - Promise with the cash flow by ID
 */
export async function getCashFlowByIdController(req: Request, res: Response): Promise<CreateCashFlowParams | any> {
  const { id } = req.params;
  try {
    const repoService = await getCashFlowById(Number(id));
    if (!repoService) {
      return res.status(404).json({ error: 'Fluxo de caixa não encontrado' });
    }
    return res.status(200).json({ message: 'Fluxo de caixa obtido com sucesso', data: repoService });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao obter fluxo de caixa por ID' });
  }
}

/**
 * @description Delete a cash flow report
 * @param {Request} req - Request object with the cash flow ID as a parameter
 * @param {Response} res - Response object
 * @returns {Promise<CreateCashFlowParams | any>} - Promise with the deleted cash flow report
 */
export async function deleteCashFlowController(req: Request, res: Response): Promise<CreateCashFlowParams | any> {
  const { id } = req.params;
  try {
    const repoService = await deleteCashFlow(Number(id));
    if (!repoService) {
      return res.status(404).json({ error: 'Fluxo de caixa não encontrado' });
    }
    return res.status(200).json({ message: 'Fluxo de caixa excluido com sucesso', data: repoService });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao excluir fluxo de caixa' });
  }
}

/**
 * @description Update a cash flow report by ID
 * @param {Request} req - Request object containing the cash flow ID in the params and updated data in the body
 * @param {Response} res - Response object
 * @returns {Promise<CreateCashFlowParams | any>} - Promise with the updated cash flow report
 * @throws Error 404 if the cash flow report is not found
 * @throws Error 500 if there is an error while updating the cash flow report
 */

export async function updateCashFlowController(req: Request, res: Response): Promise<CreateCashFlowParams | any> {
  const { id } = req.params;
  const parse = cashFlowSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ errors: parse.error.flatten().fieldErrors });
  }
  const { description, amount, type, planeId } = req.body;
  try {
    const repoService = await updateCashFlow(Number(id), { description, amount, type, planeId });
    if (!repoService) {
      return res.status(404).json({ error: 'Fluxo de caixa não encontrado' });
    }
    return res.status(200).json({ message: 'Fluxo de caixa atualizado com sucesso', data: repoService });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar fluxo de caixa' });
  }
}

/**
 * @description Delete all cash flow reports
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<CreateCashFlowParams | any>} - Promise with the deleted cash flow reports
 * @throws Error 500 if there is an error while deleting the cash flow reports
 */
export async function deleteAllCashFlowsController(req: Request, res: Response): Promise<CreateCashFlowParams | any> {
  try {
    const repoService = await deleteAllCashFlows();
    return res.status(200).json({ message: 'Todos os fluxos de caixa foram excluidos com sucesso', data: repoService });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao excluir todos os fluxos de caixa' });
  }
}


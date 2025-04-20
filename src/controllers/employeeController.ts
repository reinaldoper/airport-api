
import { Request, Response } from 'express';
import { employeeSchema } from '../validations/employeeSchema';
import { EmployeeRole } from '../entities/Employee';
import { CreateEmployerParams, createEmployer, getEmployers, getEmployersByRole, updateEmployer, deleteEmployer, getEmployerById } from '../services/createEmployer';


/**
 * @description Obtém todos os funcionários
 * @param {Request} req - Request do Express
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com a lista de funcionários se bem-sucedido
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os funcionários
 */

export const getAllEmployees = async (req: Request, res: Response): Promise<CreateEmployerParams | any> => {
  try {
    const employees = await getEmployers();
    return res.status(200).json({ message: 'Funcionários obtidos com sucesso', data: employees });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar funcionários' });
  }
};


/**
 * @description Cria um novo funcionário
 * @param {Request} req - Request do Express contendo os dados do funcionário
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o funcionário criado
 * @throws {Error} - Erro 400 se os dados de entrada forem inválidos
 * @throws {Error} - Erro 500 caso ocorra um erro ao criar o funcionário
 */

export const createEmployee = async (req: Request, res: Response): Promise<CreateEmployerParams | any> => {
  const { nome, matricula, funcao } = req.body;
  const parse = employeeSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten().fieldErrors });
  }

  try {
    const contratadoEm = new Date();
    const employee = await createEmployer({ nome, matricula, contratadoEm, funcao });
    return res.status(201).json({ message: 'Funcionário criado com sucesso', data: employee });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar funcionário' });
  }
};


/**
 * @description Obtém um funcionário pelo ID
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateEmployerParams | any>} - Promise com o funcionário encontrado
 * @throws {Error} - Erro 404 se o funcionário não for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar o funcionário
 */
export const getEmployeeById = async (req: Request, res: Response): Promise<CreateEmployerParams | any> => {
  const { id } = req.params;

  try {
    const employee = await getEmployerById(Number(id));

    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    return res.status(200).json({ message: 'Funcionário encontrado', data: employee });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar funcionário' });
  }
};


/**
 * @description Atualiza um funcionário
 * @param {Request} req - Request do Express contendo o parâmetro ID e os dados atualizados do funcionário
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateEmployerParams | any>} - Promise com o funcionário atualizado
 * @throws {Error} - Erro 404 se o funcionário não for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao atualizar o funcionário
 */

export const updateEmployee = async (req: Request, res: Response): Promise<CreateEmployerParams | any> => {
  const { id } = req.params;
  const { nome, matricula, funcao } = req.body;
  const parse = employeeSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten().fieldErrors });
  }
  const contratadoEm = new Date();
  try {
    const employee = await updateEmployer(Number(id), { nome, matricula, contratadoEm, funcao });
    return res.status(200).json({ message: 'Funcionário atualizado com sucesso', data: employee });
  } catch (error) {
    if (error instanceof Error && error.message === 'Employee not found') {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    return res.status(500).json({ error: 'Erro ao atualizar funcionário' });
  }
};


/**
 * @description Exclui um funcionário
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateEmployerParams | any>} - Promise indicando o sucesso ou falha da exclusão
 * @throws {Error} - Erro 404 se o funcionário não for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao excluir o funcionário
 */

export const deleteEmployee = async (req: Request, res: Response): Promise<CreateEmployerParams | any> => {
  const { id } = req.params;

  try {
    const employee = await deleteEmployer(Number(id));
    return res.status(204).json({ message: 'Funcionário excluido com sucesso', data: employee });
  } catch (error) {
    if (error instanceof Error && error.message === 'Employee not found') {
      return res.status(404).json({ error: 'Funcionário não encontrado' }); 
    }
    return res.status(500).json({ message: 'Erro ao excluir funcionário', error });
  }
};


/**
 * @description Obtém funcionários por função
 * @param {Request} req - Request do Express contendo o parâmetro função
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateEmployerParams | any>} - Promise com a lista de funcionários filtrados por função
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os funcionários
 */
export const getEmployeesByRole = async (req: Request, res: Response): Promise<CreateEmployerParams | any> => {
  const { role } = req.params;

  try {
    const employees = await getEmployersByRole(role as EmployeeRole);
    return res.status(200).json({ message: 'Funcionários encontrados', data: employees });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar funcionários' });
  }
};

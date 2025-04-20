"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesByRole = exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.createEmployee = exports.getAllEmployees = void 0;
const employeeSchema_1 = require("../validations/employeeSchema");
const createEmployer_1 = require("../services/createEmployer");
/**
 * @description Obtém todos os funcionários
 * @param {Request} req - Request do Express
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com a lista de funcionários se bem-sucedido
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os funcionários
 */
const getAllEmployees = async (req, res) => {
    try {
        const employees = await (0, createEmployer_1.getEmployers)();
        return res.status(200).json({ message: 'Funcionários obtidos com sucesso', data: employees });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar funcionários' });
    }
};
exports.getAllEmployees = getAllEmployees;
/**
 * @description Cria um novo funcionário
 * @param {Request} req - Request do Express contendo os dados do funcionário
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o funcionário criado
 * @throws {Error} - Erro 400 se os dados de entrada forem inválidos
 * @throws {Error} - Erro 500 caso ocorra um erro ao criar o funcionário
 */
const createEmployee = async (req, res) => {
    const { nome, matricula, funcao } = req.body;
    const parse = employeeSchema_1.employeeSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ error: parse.error.flatten().fieldErrors });
    }
    try {
        const contratadoEm = new Date();
        const employee = await (0, createEmployer_1.createEmployer)({ nome, matricula, contratadoEm, funcao });
        return res.status(201).json({ message: 'Funcionário criado com sucesso', data: employee });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao criar funcionário' });
    }
};
exports.createEmployee = createEmployee;
/**
 * @description Obtém um funcionário pelo ID
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateEmployerParams | any>} - Promise com o funcionário encontrado
 * @throws {Error} - Erro 404 se o funcionário não for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar o funcionário
 */
const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await (0, createEmployer_1.getEmployerById)(Number(id));
        if (!employee) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        return res.status(200).json({ message: 'Funcionário encontrado', data: employee });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar funcionário' });
    }
};
exports.getEmployeeById = getEmployeeById;
/**
 * @description Atualiza um funcionário
 * @param {Request} req - Request do Express contendo o parâmetro ID e os dados atualizados do funcionário
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateEmployerParams | any>} - Promise com o funcionário atualizado
 * @throws {Error} - Erro 404 se o funcionário não for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao atualizar o funcionário
 */
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { nome, matricula, funcao } = req.body;
    const parse = employeeSchema_1.employeeSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ error: parse.error.flatten().fieldErrors });
    }
    const contratadoEm = new Date();
    try {
        const employee = await (0, createEmployer_1.updateEmployer)(Number(id), { nome, matricula, contratadoEm, funcao });
        return res.status(200).json({ message: 'Funcionário atualizado com sucesso', data: employee });
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Employee not found') {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        return res.status(500).json({ error: 'Erro ao atualizar funcionário' });
    }
};
exports.updateEmployee = updateEmployee;
/**
 * @description Exclui um funcionário
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateEmployerParams | any>} - Promise indicando o sucesso ou falha da exclusão
 * @throws {Error} - Erro 404 se o funcionário não for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao excluir o funcionário
 */
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await (0, createEmployer_1.deleteEmployer)(Number(id));
        return res.status(204).json({ message: 'Funcionário excluido com sucesso', data: employee });
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Employee not found') {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        return res.status(500).json({ message: 'Erro ao excluir funcionário', error });
    }
};
exports.deleteEmployee = deleteEmployee;
/**
 * @description Obtém funcionários por função
 * @param {Request} req - Request do Express contendo o parâmetro função
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateEmployerParams | any>} - Promise com a lista de funcionários filtrados por função
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os funcionários
 */
const getEmployeesByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const employees = await (0, createEmployer_1.getEmployersByRole)(role);
        return res.status(200).json({ message: 'Funcionários encontrados', data: employees });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar funcionários' });
    }
};
exports.getEmployeesByRole = getEmployeesByRole;

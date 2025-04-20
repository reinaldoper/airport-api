"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPassengers = createPassengers;
exports.getAllPassenger = getAllPassenger;
exports.getPassengerByIds = getPassengerByIds;
exports.updatePassengers = updatePassengers;
exports.deletePassengers = deletePassengers;
const createPassenger_1 = require("../services/createPassenger");
const passengerSchema_1 = require("../validations/passengerSchema");
/**
 * @description Cria um novo passageiro com os dados fornecidos.
 * @param {Request} req - Requisição do Express contendo os dados do passageiro no corpo.
 * @param {Response} res - Resposta do Express para enviar o resultado.
 * @returns {Promise<PassengerData | any>} - Promise com o passageiro criado se bem-sucedido.
 * @throws {Error} - Erro 400 se o corpo da requisição for inválido.
 * @throws {Error} - Erro 500 caso ocorra um erro ao criar o passageiro.
 */
async function createPassengers(req, res) {
    const result = passengerSchema_1.passengerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }
    try {
        const newPassenger = await (0, createPassenger_1.createPassenger)(req.body);
        return res.status(201).json({ message: 'Passageiro criado com sucesso', data: newPassenger });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao criar passageiro' });
    }
}
/**
 * @description Obt m todos os passageiros
 * @param {Request} req - Requisi o do Express (n o   utilizada)
 * @param {Response} res - Resposta do Express para enviar o resultado
 * @returns {Promise<PassengerData | any>} - Promise com a lista de passageiros se bem-sucedido
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os passageiros
 */
async function getAllPassenger(req, res) {
    try {
        const passengers = await (0, createPassenger_1.getAllPassengers)();
        return res.status(200).json({ message: 'Lista de passageiros', data: passengers });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar passageiros' });
    }
}
/**
 * @description Obt m um passageiro pelo ID
 * @param {Request} req - Request do Express contendo o par metro ID do passageiro
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<PassengerData | any>} - Promise com o passageiro encontrado se bem-sucedido
 * @throws {Error} - Erro 404 se o passageiro n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar o passageiro
 */
async function getPassengerByIds(req, res) {
    try {
        const id = Number(req.params.id);
        const passenger = await (0, createPassenger_1.getPassengerById)(id);
        return res.status(200).json({ message: 'Passageiro obtido com sucesso', data: passenger });
    }
    catch (error) {
        if (error instanceof Error && error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao buscar passageiro' });
    }
}
/**
 * @description Atualiza um passageiro
 * @param {Request} req - Request do Express contendo o par metro ID do passageiro e os dados atualizados do passageiro
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<PassengerData | any>} - Promise com o passageiro atualizado se bem-sucedido
 * @throws {Error} - Erro 404 se o passageiro n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao atualizar o passageiro
 */
async function updatePassengers(req, res) {
    const result = passengerSchema_1.passengerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }
    try {
        const id = Number(req.params.id);
        const updatedPassenger = await (0, createPassenger_1.updatePassenger)(id, req.body);
        return res.status(200).json({ message: 'Passageiro atualizado com sucesso', data: updatedPassenger });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao atualizar passageiro' });
    }
}
/**
 * @description Deleta um passageiro
 * @param {Request} req - Request do Express contendo o par metro ID do passageiro
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<PassengerData | any>} - Promise com o passageiro deletado se bem-sucedido
 * @throws {Error} - Erro 404 se o passageiro n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao deletar o passageiro
 */
async function deletePassengers(req, res) {
    try {
        const id = Number(req.params.id);
        const passenger = await (0, createPassenger_1.deletePassenger)(id);
        return res.status(200).json({ message: 'Passageiro deletado com sucesso', data: passenger });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ message: 'Erro ao remover passageiro', error });
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlaneController = exports.updatePlaneController = exports.getPlaneByIdController = exports.getPlanesController = exports.createPlaneController = void 0;
const createAirPlane_1 = require("../services/createAirPlane");
/**
 * @description Cria um avião
 * @param {Request} req - Request do Express contendo os dados do avião
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o avião criado
 * @throws {Error} - Erro 500 caso ocorra um erro ao criar o avião
 */
const createPlaneController = async (req, res) => {
    const { modelo, anoFabricacao, capacidade, valorCompra } = req.body;
    try {
        const createdAt = new Date();
        const plane = await (0, createAirPlane_1.createPlane)({ modelo, anoFabricacao, capacidade, valorCompra, createdAt });
        return res.status(201).json({ message: "Avião criado com sucesso", data: plane });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro ao criar avião" });
    }
};
exports.createPlaneController = createPlaneController;
/**
 * @description Obtém todos os avi es
 * @param {Request} req - Request do Express (n o   utilizado)
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com a lista de avi es se bem-sucedido
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os avi es
 */
const getPlanesController = async (req, res) => {
    try {
        const planes = await (0, createAirPlane_1.getPlanes)();
        return res.status(200).json({ message: "Avioes obtidos com sucesso", data: planes });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro ao obter avioes" });
    }
};
exports.getPlanesController = getPlanesController;
/**
 * @description Obtém um avião pelo ID
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o avião pelo ID
 * @throws {Error} - Erro 404 se o avião n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar o avião
 */
const getPlaneByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const plane = await (0, createAirPlane_1.getPlaneById)(Number(id));
        if (!plane) {
            return res.status(404).json({ error: "Avião não encontrado" });
        }
        return res.status(200).json({ message: "Avião obtido com sucesso", data: plane });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro ao obter avião por ID" });
    }
};
exports.getPlaneByIdController = getPlaneByIdController;
/**
 * @description Atualiza um avião
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o avião atualizado
 * @throws {Error} - Erro 404 se o avião n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao atualizar o avião
 */
const updatePlaneController = async (req, res) => {
    const { id } = req.params;
    const { modelo, anoFabricacao, capacidade, valorCompra } = req.body;
    try {
        const createdAt = new Date();
        const plane = await (0, createAirPlane_1.updatePlane)(Number(id), { modelo, anoFabricacao, capacidade, valorCompra, createdAt });
        if (!plane) {
            return res.status(404).json({ error: "Avião não encontrado" });
        }
        return res.status(200).json({ message: "Avião atualizado com sucesso", data: plane });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar avião" });
    }
};
exports.updatePlaneController = updatePlaneController;
/**
 * @description Exclui um avião
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o avião excluído
 * @throws {Error} - Erro 404 se o avião n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao excluir o avião
 */
const deletePlaneController = async (req, res) => {
    const { id } = req.params;
    try {
        const plane = await (0, createAirPlane_1.deletePlane)(Number(id));
        if (!plane) {
            return res.status(404).json({ error: "Avião não encontrado" });
        }
        return res.status(200).json({ message: "Avião excluído com sucesso", data: plane });
    }
    catch (error) {
        return res.status(500).json({ error: "Erro ao excluir avião" });
    }
};
exports.deletePlaneController = deletePlaneController;

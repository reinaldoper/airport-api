"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlightByAirport = exports.deleteFlights = exports.updateFlights = exports.createFlights = exports.getFlightByIds = exports.getAllFlight = void 0;
const flightSchema_1 = require("../validations/flightSchema");
const createFlight_1 = require("../services/createFlight");
/**
 * @description Obtém todos os voos
 * @param _ Request do Express (n o   utilizado)
 * @param res Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com a lista de voos se bem-sucedido
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os voos
 */
const getAllFlight = async (_, res) => {
    const flights = await (0, createFlight_1.getAllFlights)();
    return res.status(200).json({ message: 'Lista de voos', data: flights });
};
exports.getAllFlight = getAllFlight;
/**
 * @description Obtém um voo pelo ID
 * @param {Request} req - Request do Express contendo o parâmetro ID
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<any>} - Promise com o voo encontrado se bem-sucedido
 * @throws {Error} - Erro 404 se o voo não for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar o voo
 */
const getFlightByIds = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const flight = await (0, createFlight_1.getFlightById)(id);
        return res.status(200).json({ message: 'Voo obtido com sucesso', data: flight });
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Voo não encontrado') {
            return res.status(404).json({ error: 'Voo não encontrado' });
        }
        return res.status(500).json({ error: 'Erro ao buscar voo' });
    }
};
exports.getFlightByIds = getFlightByIds;
/**
 * @description Cria um novo voo com os dados fornecidos.
 * @param {Request} req - Requisição do Express contendo os dados do voo no corpo.
 * @param {Response} res - Resposta do Express para enviar o resultado.
 * @returns {Promise<FlightData | any>} - Promise com o voo criado se bem-sucedido.
 * @throws {Error} - Erro 400 se o corpo da requisição for inválido.
 * @throws {Error} - Erro 500 caso ocorra um erro ao criar o voo.
 */
const createFlights = async (req, res) => {
    const validation = flightSchema_1.flightSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }
    try {
        const { origem, destino, dataHoraPartida, dataHoraChegada, status, plane } = req.body;
        const newFlight = await (0, createFlight_1.createFlight)({ origem, destino, dataHoraPartida, dataHoraChegada, status, plane });
        return res.status(201).json({ message: 'Voo criado com sucesso', data: newFlight });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao criar voo' });
    }
};
exports.createFlights = createFlights;
/**
 * Atualiza um voo existente.
 * @param {Request} req - Requisi o do Express com o par metro ID
 * @param {Response} res - Resposta do Express para enviar o resultado
 * @returns {Promise<FlightData | any>} - Promise com o voo atualizado se bem-sucedido
 * @throws {Error} - Erro 400 se o corpo da requisi o for inv lido
 * @throws {Error} - Erro 404 se o voo n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao atualizar o voo
 */
const updateFlights = async (req, res) => {
    const id = Number(req.params.id);
    const validation = flightSchema_1.flightSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }
    try {
        const { origem, destino, dataHoraPartida, dataHoraChegada, status, plane } = req.body;
        const updatedFlight = await (0, createFlight_1.updateFlight)(id, { origem, destino, dataHoraPartida, dataHoraChegada, status, plane });
        return res.status(200).json({ message: 'Voo atualizado com sucesso', data: updatedFlight });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao atualizar voo' });
    }
};
exports.updateFlights = updateFlights;
/**
 * @description Exclui um voo
 * @param req Request do Express contendo o parâmetro ID do voo
 * @returns Status 200 com uma mensagem de sucesso e o voo excluído
 * @throws Error 404 se o voo n o for encontrado
 * @throws Error 500 caso ocorra um erro ao excluir o voo
 */
const deleteFlights = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const deletedFlight = await (0, createFlight_1.deleteFlight)(id);
        return res.status(200).json({ message: 'Voo excluido com sucesso', data: deletedFlight });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao excluir voo' });
    }
};
exports.deleteFlights = deleteFlights;
/**
 * @description Obtém um voo por ID do aeroporto
 * @param req Request do Express contendo o parâmetro ID do aeroporto
 * @param res Response do Express para enviar o resultado
 * @returns Status 200 com os dados do voo se encontrado
 * @throws Error 400 se o parâmetro ID for inválido
 * @throws Error 404 se o voo não for encontrado
 * @throws Error 500 caso ocorra um erro ao buscar o voo
 */
const getFlightByAirport = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const flight = await (0, createFlight_1.getFlightByAirportId)(id);
        return res.status(200).json({ message: 'Voo obtido com sucesso', data: flight });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao buscar voo' });
    }
};
exports.getFlightByAirport = getFlightByAirport;

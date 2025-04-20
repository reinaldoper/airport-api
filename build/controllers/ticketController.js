"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTickets = createTickets;
exports.getAllTicket = getAllTicket;
exports.getTicketByIds = getTicketByIds;
exports.updateTickets = updateTickets;
exports.deleteTickets = deleteTickets;
exports.getTicketsByFlightIds = getTicketsByFlightIds;
exports.getTicketsByPassengerIds = getTicketsByPassengerIds;
const createTicket_1 = require("../services/createTicket");
const ticketSchema_1 = require("../validations/ticketSchema");
/**
 * @description Cria um novo ticket com os dados fornecidos.
 * @param {Request} req - Requisi o do Express contendo os dados do ticket no corpo.
 * @param {Response} res - Resposta do Express para enviar o resultado.
 * @returns {Promise<CreateTicketParams | any>} - Promise com o ticket criado se bem-sucedido.
 * @throws {Error} - Erro 400 se o corpo da requisi o for inv lido.
 * @throws {Error} - Erro 500 caso ocorra um erro ao criar o ticket.
 */
async function createTickets(req, res) {
    const result = ticketSchema_1.ticketSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }
    try {
        const newTicket = await (0, createTicket_1.createTicket)(req.body);
        return res.status(201).json({ message: 'Ticket criado com sucesso', data: newTicket });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao criar ticket' });
    }
}
/**
 * @description Obt m todos os tickets
 * @param {Request} req - Requisi o do Express (n o   utilizada)
 * @param {Response} res - Resposta do Express para enviar o resultado
 * @returns {Promise<CreateTicketParams | any>} - Promise com a lista de tickets se bem-sucedido
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os tickets
 */
async function getAllTicket(req, res) {
    try {
        const tickets = await (0, createTicket_1.getAllTickets)();
        return res.status(200).json({ message: 'Tickets obtidos com sucesso', data: tickets });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar tickets' });
    }
}
/**
 * @description Obt m um ticket pelo ID
 * @param {Request} req - Request do Express contendo o par metro ID do ticket
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateTicketParams | any>} - Promise com o ticket encontrado se bem-sucedido
 * @throws {Error} - Erro 404 se o ticket n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar o ticket
 */
async function getTicketByIds(req, res) {
    try {
        const id = Number(req.params.id);
        const ticket = await (0, createTicket_1.getTicketById)(id);
        return res.status(200).json({ message: 'Ticket obtido com sucesso', data: ticket });
    }
    catch (error) {
        if (error instanceof Error && error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ message: 'Erro ao buscar ticket' });
    }
}
/**
 * @description Atualiza um ticket existente.
 * @param {Request} req - Request do Express com o par metro ID do ticket a ser atualizado
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateTicketParams | any>} - Promise com o ticket atualizado se bem-sucedido
 * @throws {Error} - Erro 400 se o corpo da requisi o for inv lido
 * @throws {Error} - Erro 404 se o ticket n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao atualizar o ticket
 */
async function updateTickets(req, res) {
    const result = ticketSchema_1.ticketSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
    }
    try {
        const id = Number(req.params.id);
        const ticket = await (0, createTicket_1.updateTicket)(id, req.body);
        return res.status(200).json({ message: 'Ticket atualizado com sucesso', data: ticket });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ message: 'Erro ao atualizar ticket', error });
    }
}
/**
 * @description Deleta um ticket pelo ID
 * @param {Request} req - Request do Express contendo o par metro ID do ticket
 * @param {Response} res - Response do Express para enviar o resultado
 * @returns {Promise<CreateTicketParams | any>} - Promise com o ticket deletado se bem-sucedido
 * @throws {Error} - Erro 404 se o ticket n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao deletar o ticket
 */
async function deleteTickets(req, res) {
    try {
        const id = Number(req.params.id);
        const ticket = await (0, createTicket_1.deleteTicket)(id);
        return res.status(200).json({ message: 'Ticket deletado com sucesso', data: ticket });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ message: 'Erro ao deletar ticket', error });
    }
}
/**
 * @description Obtém todos os tickets associados a um voo específico pelo ID do voo.
 * @param {Request} req - Request do Express contendo o parâmetro ID do voo.
 * @param {Response} res - Response do Express para enviar o resultado.
 * @returns {Promise<CreateTicketParams | any>} - Promise com a lista de tickets se bem-sucedido.
 * @throws {Error} - Erro 404 se o voo ou os tickets não forem encontrados.
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os tickets.
 */
async function getTicketsByFlightIds(req, res) {
    try {
        const id = Number(req.params.id);
        const tickets = await (0, createTicket_1.getTicketsByFlightId)(id);
        return res.status(200).json({ message: 'Tickets obtidos com sucesso', data: tickets });
    }
    catch (error) {
        if (error instanceof Error && error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ message: 'Erro ao buscar tickets', error });
    }
}
/**
 * @description Obtém todos os tickets associados a um passageiro específico pelo ID do passageiro.
 * @param {Request} req - Request do Express contendo o parâmetro ID do passageiro.
 * @param {Response} res - Response do Express para enviar o resultado.
 * @returns {Promise<CreateTicketParams | any>} - Promise com a lista de tickets se bem-sucedido.
 * @throws {Error} - Erro 404 se o passageiro ou os tickets não forem encontrados.
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os tickets.
 */
async function getTicketsByPassengerIds(req, res) {
    try {
        const id = Number(req.params.id);
        const tickets = await (0, createTicket_1.getTicketsByPassengerId)(id);
        return res.status(200).json({ message: 'Tickets obtidos com sucesso', data: tickets });
    }
    catch (error) {
        if (error instanceof Error && error.message) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao buscar tickets' });
    }
}

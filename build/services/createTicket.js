"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = createTicket;
exports.getAllTickets = getAllTickets;
exports.getTicketById = getTicketById;
exports.updateTicket = updateTicket;
exports.deleteTicket = deleteTicket;
exports.getTicketsByPassengerId = getTicketsByPassengerId;
exports.getTicketsByFlightId = getTicketsByFlightId;
const data_source_1 = require("../database/data-source");
const Ticket_1 = require("../entities/Ticket");
const Passenger_1 = require("../entities/Passenger");
const Flight_1 = require("../entities/Flight");
const ticketRepo = data_source_1.AppDataSource.getRepository(Ticket_1.Ticket);
const passengerRepo = data_source_1.AppDataSource.getRepository(Passenger_1.Passenger);
const flightRepo = data_source_1.AppDataSource.getRepository(Flight_1.Flight);
/**
 * Creates a new ticket with the specified parameters.
 * @param {CreateTicketParams} params - The parameters for creating a ticket.
 * @param {string} params.assento - The seat number.
 * @param {number} params.preco - The price of the ticket.
 * @param {number} params.passageiroId - The ID of the passenger.
 * @param {number} params.vooId - The ID of the flight.
 * @returns {Promise<Ticket>} - A promise that resolves to the newly created ticket.
 * @throws {Error} - Throws an error if the ticket data is invalid or if the passenger or flight is not found.
 */
async function createTicket({ assento, preco, passageiroId, vooId }) {
    const passageiro = await passengerRepo.findOneBy({ id: passageiroId });
    const voo = await flightRepo.findOneBy({ id: vooId });
    if (!passageiro || !voo) {
        throw new Error('Passenger or flight not found');
    }
    const ticket = ticketRepo.create({
        assento,
        preco,
        passageiro,
        voo
    });
    return await ticketRepo.save(ticket);
}
/**
 * Obt m todos os tickets.
 * @returns {Promise<Ticket[]>} - Promise com a lista de tickets se bem-sucedido
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os tickets
 */
async function getAllTickets() {
    return await ticketRepo.find({ relations: ['passageiro', 'voo'] });
}
/**
 * Obt m um ticket pelo ID.
 * @param {number} id - ID do ticket
 * @returns {Promise<Ticket>} - Promise com o ticket encontrado se bem-sucedido
 * @throws {Error} - Erro 404 se o ticket n o for encontrado
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar o ticket
 */
async function getTicketById(id) {
    return await ticketRepo.findOne({
        where: { id },
        relations: ['passageiro', 'voo'],
    });
}
/**
 * Atualiza um ticket existente.
 * @param {number} id - ID do ticket a ser atualizado
 * @param {CreateTicketParams} data - Dados do ticket a serem atualizados
 * @returns {Promise<Ticket>} - Promise com o ticket atualizado se bem-sucedido
 * @throws {Error} - Erro 404 se o ticket n o for encontrado
 * @throws {Error} - Erro 404 se o passageiro ou o voo n o forem encontrados
 * @throws {Error} - Erro 500 caso ocorra um erro ao atualizar o ticket
 */
async function updateTicket(id, { assento, preco, passageiroId, vooId }) {
    const ticket = await ticketRepo.findOneBy({ id });
    if (!ticket) {
        throw new Error('Ticket not found');
    }
    const passageiro = await passengerRepo.findOneBy({ id: passageiroId });
    const voo = await flightRepo.findOneBy({ id: vooId });
    if (!passageiro || !voo) {
        throw new Error('Passenger or flight not found');
    }
    ticket.assento = assento;
    ticket.preco = preco;
    ticket.passageiro = passageiro;
    ticket.voo = voo;
    return await ticketRepo.save(ticket);
}
/**
 * Deletes a ticket by its ID.
 * @param {number} id - The ID of the ticket to be deleted.
 * @returns {Promise<Ticket>} - Promise with the deleted ticket if successful.
 * @throws {Error} - Error if the ticket is not found.
 */
async function deleteTicket(id) {
    const ticket = await ticketRepo.findOneBy({ id });
    if (!ticket) {
        throw new Error('Ticket not found');
    }
    return await ticketRepo.remove(ticket);
}
/**
 * Retrieves all tickets associated with a specific passenger by their ID.
 * @param {number} passageiroId - The ID of the passenger.
 * @returns {Promise<Ticket[]>} - Promise resolving to a list of tickets if successful.
 * @throws {Error} - Error 404 if no tickets are found for the passenger.
 * @throws {Error} - Error 500 if an error occurs while fetching the tickets.
 */
async function getTicketsByPassengerId(passageiroId) {
    return await ticketRepo.find({
        where: { passageiro: { id: passageiroId } },
        relations: ['passageiro', 'voo'],
    });
}
/**
 * Obt m todos os tickets associados a um voo espec fico pelo ID do voo.
 * @param {number} vooId - ID do voo
 * @returns {Promise<Ticket[]>} - Promise com a lista de tickets se bem-sucedido
 * @throws {Error} - Erro 404 se o voo ou os tickets n o forem encontrados
 * @throws {Error} - Erro 500 caso ocorra um erro ao buscar os tickets
 */
async function getTicketsByFlightId(vooId) {
    return await ticketRepo.find({
        where: { voo: { id: vooId } },
        relations: ['passageiro', 'voo'],
    });
}

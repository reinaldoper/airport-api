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
const ticketSchema_1 = require("../validations/ticketSchema");
const Passenger_1 = require("../entities/Passenger");
const Flight_1 = require("../entities/Flight");
const ticketRepo = data_source_1.AppDataSource.getRepository(Ticket_1.Ticket);
const passengerRepo = data_source_1.AppDataSource.getRepository(Passenger_1.Passenger);
const flightRepo = data_source_1.AppDataSource.getRepository(Flight_1.Flight);
async function createTicket({ assento, preco, passageiroId, vooId }) {
    const result = ticketSchema_1.ticketSchema.safeParse({ assento, preco, passageiroId, vooId });
    if (!result.success) {
        throw new Error('Invalid ticket data');
    }
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
async function getAllTickets() {
    return await ticketRepo.find({ relations: ['passageiro', 'voo'] });
}
async function getTicketById(id) {
    return await ticketRepo.findOne({
        where: { id },
        relations: ['passageiro', 'voo'],
    });
}
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
async function deleteTicket(id) {
    const ticket = await ticketRepo.findOneBy({ id });
    if (!ticket) {
        throw new Error('Ticket not found');
    }
    return await ticketRepo.remove(ticket);
}
async function getTicketsByPassengerId(passageiroId) {
    return await ticketRepo.find({
        where: { passageiro: { id: passageiroId } },
        relations: ['passageiro', 'voo'],
    });
}
async function getTicketsByFlightId(vooId) {
    return await ticketRepo.find({
        where: { voo: { id: vooId } },
        relations: ['passageiro', 'voo'],
    });
}

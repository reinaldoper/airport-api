import { AppDataSource } from '../database/data-source';
import { Ticket } from '../entities/Ticket';
import { ticketSchema } from '../validations/ticketSchema';
import { Passenger } from '../entities/Passenger';
import { Flight } from '../entities/Flight';

const ticketRepo = AppDataSource.getRepository(Ticket);
const passengerRepo = AppDataSource.getRepository(Passenger);
const flightRepo = AppDataSource.getRepository(Flight);

export interface CreateTicketParams {
  assento: string;
  preco: number;
  passageiroId: number;
  vooId: number;
}
export async function createTicket({ assento, preco, passageiroId, vooId }: CreateTicketParams) {
  const result = ticketSchema.safeParse({ assento, preco, passageiroId, vooId });
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

export async function getAllTickets() {
  return await ticketRepo.find({ relations: ['passageiro', 'voo'] });
}
export async function getTicketById(id: number) {
  return await ticketRepo.findOne({
    where: { id },
    relations: ['passageiro', 'voo'],
  });
} 
export async function updateTicket(id: number, { assento, preco, passageiroId, vooId }: CreateTicketParams) {
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

export async function deleteTicket(id: number) {
  const ticket = await ticketRepo.findOneBy({ id });
  if (!ticket) {
    throw new Error('Ticket not found');
  }
  return await ticketRepo.remove(ticket);
}
export async function getTicketsByPassengerId(passageiroId: number) {
  return await ticketRepo.find({
    where: { passageiro: { id: passageiroId } },
    relations: ['passageiro', 'voo'],
  });
}
export async function getTicketsByFlightId(vooId: number) {
  return await ticketRepo.find({
    where: { voo: { id: vooId } },
    relations: ['passageiro', 'voo'],
  });
}
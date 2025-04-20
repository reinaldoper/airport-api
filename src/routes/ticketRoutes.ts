import { Router } from 'express';
import {
  createTickets,
  getAllTicket,
  getTicketByIds,
  updateTickets,
  deleteTickets,
  getTicketsByFlightIds,
  getTicketsByPassengerIds,
} from '../controllers/ticketController';

const router = Router();

router.post('/', createTickets);
router.get('/', getAllTicket);
router.get('/:id', getTicketByIds);
router.put('/:id', updateTickets);
router.delete('/:id', deleteTickets);
router.get('/flight/:id', getTicketsByFlightIds);
router.get('/passenger/:id', getTicketsByPassengerIds);

export default router;

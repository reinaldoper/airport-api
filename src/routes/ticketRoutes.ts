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

router.post('/tickets', createTickets);
router.get('/tickets', getAllTicket);
router.get('/tickets/:id', getTicketByIds);
router.put('/tickets/:id', updateTickets);
router.delete('/tickets/:id', deleteTickets);
router.get('/tickets/flight/:id', getTicketsByFlightIds);
router.get('/tickets/passenger/:id', getTicketsByPassengerIds);

export default router;

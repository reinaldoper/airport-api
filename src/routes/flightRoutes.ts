
import { Router } from 'express';
import {
  getAllFlight,
  getFlightByIds,
  createFlights,
  updateFlights,
  deleteFlights,
  getFlightByAirport
} from '../controllers/flightController';


const router = Router();

router.get('/flights', getAllFlight);
router.get('/flights/:id', getFlightByIds);
router.post('/flights',  createFlights);
router.put('/flights/:id',  updateFlights);
router.delete('/flights/:id', deleteFlights);
router.get('/flights/airport/:id', getFlightByAirport);

export default router;

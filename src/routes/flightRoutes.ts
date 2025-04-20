
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

router.get('/', getAllFlight);
router.get('/:id', getFlightByIds);
router.post('/',  createFlights);
router.put('/:id',  updateFlights);
router.delete('/:id', deleteFlights);
router.get('/airport/:id', getFlightByAirport);

export default router;

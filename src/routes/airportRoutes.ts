import { Router } from 'express';
import {
  createAirports,
  getAllAirports,
  getAirportByIds,
  deleteAirports,
  updateAirports,
} from '../controllers/airportController';

const router = Router();

router.post('/airports', createAirports);
router.get('/airports', getAllAirports);
router.get('/airports/:id', getAirportByIds);
router.delete('/airports/:id', deleteAirports);
router.put('/airports/:id', updateAirports);

export default router;

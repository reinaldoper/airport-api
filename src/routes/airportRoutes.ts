import { Router } from 'express';
import {
  createAirports,
  getAllAirports,
  getAirportByIds,
  deleteAirports,
  updateAirports,
} from '../controllers/airportController';

const router = Router();

router.post('/', createAirports);
router.get('/', getAllAirports);
router.get('/:id', getAirportByIds);
router.delete('/:id', deleteAirports);
router.put('/:id', updateAirports);

export default router;

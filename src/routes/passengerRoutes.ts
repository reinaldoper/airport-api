import { Router } from 'express';
import {
  createPassengers,
  getAllPassenger,
  getPassengerByIds,
  updatePassengers,
  deletePassengers
} from '../controllers/passengerController';

const router = Router();

router.post('/', createPassengers);
router.get('/', getAllPassenger);
router.get('/:id', getPassengerByIds);
router.put('/:id', updatePassengers);
router.delete('/:id', deletePassengers);

export default router;

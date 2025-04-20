import { Router } from 'express';
import {
  createPassengers,
  getAllPassenger,
  getPassengerByIds,
  updatePassengers,
  deletePassengers
} from '../controllers/passengerController';

const router = Router();

router.post('/passengers', createPassengers);
router.get('/passengers', getAllPassenger);
router.get('/passengers/:id', getPassengerByIds);
router.put('/passengers/:id', updatePassengers);
router.delete('/passengers/:id', deletePassengers);

export default router;

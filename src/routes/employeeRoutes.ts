
import { Router } from 'express';
import {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByRole
} from '../controllers/employeeController';

const router = Router();

router.get('/', getAllEmployees);
router.post('/', createEmployee);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/role/:role', getEmployeesByRole);

export default router;

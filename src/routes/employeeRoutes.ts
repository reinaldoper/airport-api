
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

router.get('/employee', getAllEmployees);
router.post('/employee', createEmployee);
router.get('/employee/:id', getEmployeeById);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);
router.get('/employee/role/:role', getEmployeesByRole);

export default router;

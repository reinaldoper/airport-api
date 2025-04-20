import { Router } from "express";
import {
  createCashFlowReport, 
  deleteCashFlowController, 
  getCashFlowByIdController, 
  getCashFlowHistoryController, 
  updateCashFlowController,
  deleteAllCashFlowsController
} from "../controllers/cashFlowController";

const router = Router();

router.post("/cashFlow", createCashFlowReport);
router.get("/cashFlow", getCashFlowHistoryController);
router.get("/cashFlow/:id", getCashFlowByIdController);
router.delete("/cashFlow/:id", deleteCashFlowController);
router.put("/cashFlow/:id", updateCashFlowController);
router.delete("/cashFlow", deleteAllCashFlowsController);

export default router;
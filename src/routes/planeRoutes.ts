import { Router } from "express";
import { createPlaneController, 
  getPlanesController, 
  getPlaneByIdController, 
  updatePlaneController,
  deletePlaneController
} from "../controllers/planeController";

const router = Router();

router.post("/planes", createPlaneController);
router.get("/planes", getPlanesController);
router.get("/planes/:id", getPlaneByIdController);
router.put("/planes/:id", updatePlaneController);
router.delete("/planes/:id", deletePlaneController);

export default router;
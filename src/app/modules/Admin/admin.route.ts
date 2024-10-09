import { Router } from "express";
import { isAdmin } from "../../middleware/authCheck";
import { AdminController } from "./admin.controller";
import { TrainerValidation } from "../Trainer/trainer.validation";
import validateRequest from "../../middleware/validateRequest";

const AdminRoute = Router();

AdminRoute.get("/trainers", isAdmin, AdminController.getAllTrainers);

AdminRoute.post("/trainer", isAdmin,
    validateRequest(TrainerValidation.TrainerCreateValidation), AdminController.createTrainer);
    
AdminRoute.put("/trainer/:id", isAdmin, 
    validateRequest(TrainerValidation.TrainerUpdateValidation), AdminController.updateTrainer);

AdminRoute.delete("/trainer/:id", isAdmin, AdminController.deleteTrainer);

export default AdminRoute;

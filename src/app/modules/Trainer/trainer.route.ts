import { Router } from "express";
import { isAdmin } from "../../middleware/authCheck";
import { TrainerValidation } from "../Trainer/trainer.validation";
import validateRequest from "../../middleware/validateRequest";
import { TrainerController } from "./trainer.controller";

const TrainerRouter = Router();

TrainerRouter.get("/trainers", isAdmin, TrainerController.getAllTrainers);

TrainerRouter.post("/trainer", isAdmin, validateRequest(TrainerValidation.TrainerCreateValidation), TrainerController.createTrainer);

TrainerRouter.put("/trainer/:id", isAdmin, validateRequest(TrainerValidation.TrainerUpdateValidation), TrainerController.updateTrainer);

TrainerRouter.delete("/trainer/:id", isAdmin, TrainerController.deleteTrainer);

export default TrainerRouter;

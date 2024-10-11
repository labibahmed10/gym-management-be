import { Router } from "express";
import { isAdmin } from "../../middleware/authCheck";
import { TrainerValidation } from "../Trainer/trainer.validation";
import validateRequest from "../../middleware/validateRequest";
import { TrainerController } from "./trainer.controller";

const TrainerRouter = Router();

TrainerRouter.get("/all", isAdmin, TrainerController.getAllTrainers);

TrainerRouter.post("/", isAdmin, validateRequest(TrainerValidation.TrainerCreateValidation), TrainerController.createTrainer);

TrainerRouter.put("/:id", isAdmin, validateRequest(TrainerValidation.TrainerUpdateValidation), TrainerController.updateTrainer);

TrainerRouter.delete("/:id", isAdmin, TrainerController.deleteTrainer);

export default TrainerRouter;

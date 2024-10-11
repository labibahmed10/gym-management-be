import { Router } from "express";
import { isAdmin, isTrainee } from "../../middleware/authCheck";
import { TraineeController } from "./trainee.controller";

const TraineeRoute = Router();

TraineeRoute.get("/profile", isTrainee, TraineeController.getProfile);
TraineeRoute.patch("/update-profile", isTrainee, TraineeController.updateProfile);

export default TraineeRoute;

import { Router } from "express";
import { isAdminOrTrainer, isAdmin } from "../../middleware/authCheck";
import { ClassScheduleController } from "./classSchedule.controller";
import { ClassScheduleValidation } from "./classScheduleValidation";
import validateRequest from "../../middleware/validateRequest";

const ScheduleRoute = Router();

ScheduleRoute.post("/", isAdmin, validateRequest(ClassScheduleValidation.createScheduleZodSchema), ClassScheduleController.createSchedule);

ScheduleRoute.get("/all", isAdminOrTrainer, ClassScheduleController.getAllSchedules);

ScheduleRoute.get("/:id", isAdmin, ClassScheduleController.getScheduleById);

ScheduleRoute.put(
  "/:id",
  isAdmin,
  validateRequest(ClassScheduleValidation.updateScheduleZodSchema),
  ClassScheduleController.updateScheduleById
);

ScheduleRoute.delete("/schedule/:id", isAdmin, ClassScheduleController.deleteScheduleById);

export default ScheduleRoute;

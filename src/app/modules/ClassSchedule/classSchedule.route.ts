import { Router } from "express";
import { isAdmin } from "../../middleware/authCheck";
import { ClassScheduleController } from "./classSchedule.controller";
import { ClassScheduleValidation } from "./classScheduleValidation";
import validateRequest from "../../middleware/validateRequest";

const ScheduleRoute = Router();

ScheduleRoute.post("/schedule", isAdmin, 
    validateRequest(ClassScheduleValidation.createScheduleZodSchema), 
    ClassScheduleController.createSchedule);

ScheduleRoute.get("/schedules", isAdmin, ClassScheduleController.getAllSchedules);

ScheduleRoute.get("/schedule/:id", isAdmin, ClassScheduleController.getScheduleById);

ScheduleRoute.put("/schedule/:id", isAdmin,
    validateRequest(ClassScheduleValidation.updateScheduleZodSchema),
    ClassScheduleController.updateScheduleById
);

ScheduleRoute.delete("/schedule/:id", isAdmin, ClassScheduleController.deleteScheduleById);

export default ScheduleRoute;

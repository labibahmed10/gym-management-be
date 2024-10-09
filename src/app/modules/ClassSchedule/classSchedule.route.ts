import { Router } from "express";
import { isAdmin } from "../../middleware/authCheck";
import { ClassScheduleController } from "./classSchedule.controller";

const ScheduleRoute = Router();

ScheduleRoute.post("/schedule", isAdmin, ClassScheduleController.createSchedule);
ScheduleRoute.get("/schedules", isAdmin, ClassScheduleController.getAllSchedules);

export default ScheduleRoute;

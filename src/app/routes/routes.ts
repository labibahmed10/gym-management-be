import { Router } from "express";
import AuthRoute from "../modules/User/user.route";
import ScheduleRoute from "../modules/ClassSchedule/classSchedule.route";
import BookingRoute from "../modules/Booking/booking.route";
import TraineeRoute from "../modules/Trainee/trainee.route";
import TrainerRouter from "../modules/Trainer/trainer.route";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/trainer",
    route: TrainerRouter,
  },
  {
    path: "/schedule",
    route: ScheduleRoute,
  },
  {
    path: "/booking",
    route: BookingRoute,
  },
  {
    path: "/trainee",
    route: TraineeRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;

import { Router } from "express";
import AuthRoute from "../modules/User/user.route";
import AdminRoute from "../modules/Admin/admin.route";
import ScheduleRoute from "../modules/ClassSchedule/classSchedule.route";
import BookingRoute from "../modules/Booking/booking.route";
import TraineeRoute from "../modules/Trainee/trainee.route";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/admin",
    route: AdminRoute,
  },
  {
    path: "/",
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

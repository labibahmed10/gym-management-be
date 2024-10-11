import { Router } from "express";
import AuthRoute from "../modules/User/user.route";
import AdminRoute from "../modules/Admin/admin.route";
import ScheduleRoute from "../modules/ClassSchedule/classSchedule.route";
import BookingRoute from "../modules/Booking/booking.route";

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
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;

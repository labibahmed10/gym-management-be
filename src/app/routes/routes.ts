import { Router } from "express";
import AuthRoute from "../modules/User/user.route";
import AdminRoute from "../modules/Admin/admin.route";

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
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;

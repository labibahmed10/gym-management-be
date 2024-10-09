import { Router } from "express";
import AuthRoute from "../modules/User/user.route";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;

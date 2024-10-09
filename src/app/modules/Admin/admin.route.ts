import { Router } from "express";
import { isAdmin } from "../../middleware/authCheck";
import { AdminController } from "./admin.controller";

const AdminRoute = Router();

AdminRoute.post("/trainer", isAdmin, AdminController.createTrainer);
// AdminRoute.put("/trainer/:id", isAdmin, AdminController.updateTrainer);
// AdminRoute.delete("/trainer/:id", isAdmin, AdminController.deleteTrainer);

export default AdminRoute;

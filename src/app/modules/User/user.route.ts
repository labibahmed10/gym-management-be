import { Router } from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";

const AuthRoute = Router();

AuthRoute.post("/register", validateRequest(UserValidation.registerValidationSchema), UserController.registerUser);
AuthRoute.post("/login", validateRequest(UserValidation.loginValidationSchema), UserController.loginUser);

export default AuthRoute;

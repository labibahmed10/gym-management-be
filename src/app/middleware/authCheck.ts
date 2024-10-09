import { NextFunction, Request, Response } from "express";
import catchAsyncFunc from "../utils/catchAsyncFunc";
import { TUserRole } from "../modules/User/user.interface";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import config from "../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../modules/User/user.model";

const authCheck = (...requiredRoles: TUserRole[]) => {
  return catchAsyncFunc(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return next(new AppError(httpStatus.UNAUTHORIZED, "Token not found"));
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    } catch (error) {
      return next(new AppError(httpStatus.UNAUTHORIZED, "Invalid token"));
    }

    console.log(decoded);
    const user = await UserModel.isUserExistById(decoded.userId);
    if (!user) {
      return next(new AppError(httpStatus.NOT_FOUND, "User not found"));
    }

    if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });
    }

    req.user = decoded;
    next();
  });
};

const isAdmin = authCheck("admin");
const isTrainer = authCheck("trainer");
const isTrainee = authCheck("trainee");

export { isAdmin, isTrainer, isTrainee };

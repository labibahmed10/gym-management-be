import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import catchAsyncFunc from "../utils/catchAsyncFunc";

const validateRequest = (schema: AnyZodObject) =>
  catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error: any) {
      next(error);
    }
  });

export default validateRequest;

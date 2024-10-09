import { Request, Response, NextFunction, RequestHandler } from "express";

const catchAsyncFunc = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsyncFunc;

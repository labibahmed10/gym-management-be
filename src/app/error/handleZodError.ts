import { ZodError, ZodIssue } from "zod";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handelZodError = (err: ZodError): IGenericErrorResponse => {
  const statusCode = 400;

  const errorDetails: IErrorSources[] = err.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path?.[issue?.path?.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: "Validation Error",
    errorDetails,
  };
};

export default handelZodError;

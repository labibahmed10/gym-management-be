import mongoose from "mongoose";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): IGenericErrorResponse => {
  const errorDetails: IErrorSources[] = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
    return {
      field: val?.path,
      message: val?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorDetails,
  };
};

export default handleValidationError;

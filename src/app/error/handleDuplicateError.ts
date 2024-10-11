import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): IGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);
  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorDetails: IErrorSources[] = [
    {
      field: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Duplicate Entry",
    errorDetails,
  };
};

export default handleDuplicateError;

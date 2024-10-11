export interface IErrorSources {
  field: string | number;
  message: string;
}

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorDetails: IErrorSources[];
}

enum ErrorTypes {
  qtyInCartMoreThanStock = "qtyInCartMoreThanStock",
  notAllReqFieldsFilled = "notAllReqFieldsFilled",
}

interface IError {
  error: boolean;
  errorMessage: string;
  errorType: ErrorTypes;
  errorTitle: "Ошибка";
}

export { ErrorTypes, IError };

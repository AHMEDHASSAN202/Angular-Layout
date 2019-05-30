import { AppError } from "./app-error";
import { Observable, throwError } from "rxjs";
import { NotFoundError } from "./not-found-error";
import { BadRequestError } from "./bad-request-error";
import { UnauthorizedError } from "./unauthorized-error";



export class CustomHandleErrors {
    
    static handle_error(error: AppError): Observable<any> {
        if (error instanceof NotFoundError)
          return throwError(NotFoundError.handle());
        else if (error instanceof BadRequestError)
          return throwError(BadRequestError.handle())
        else if (error instanceof UnauthorizedError)
          return throwError(UnauthorizedError.handle());  
        else
          return throwError(AppError.handle())
    }

}
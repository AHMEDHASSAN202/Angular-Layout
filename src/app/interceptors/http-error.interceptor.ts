import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';
import { UnauthorizedError } from '../errors/unauthorized-error';




export class HttpErrorInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    // client error
                    return throwError('An error occurred:' + error.error.message)
                }else {
                    // server error
                    if (error.status === 404)
                        return throwError(new NotFoundError(error));
                    else if (error.status === 400) 
                        return throwError(new BadRequestError(error))
                    else if (error.status === 401)
                        return throwError(new UnauthorizedError(error));    
                    else
                        return throwError(new AppError(error))
                }
            })
        );
    }

}
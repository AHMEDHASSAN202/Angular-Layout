import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';
import { UnauthorizedError } from '../errors/unauthorized-error';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private url:string, private http: HttpClient) { }

  get() {
    return this.http.get(this.url).pipe(
      retry(1),
      catchError((error: AppError) => {
        return this.handle_error(error);
      })
    );
  }

  create(resource) {
    return this.http.post(this.url, resource).pipe(
      retry(1),
      catchError((error: AppError) => {
        return this.handle_error(error);
      })
    );
  }

  update(resource) {
    const url = this.url + '/' + resource.id;
    return this.http.patch(url, resource).pipe(
      retry(1),
      catchError((error: AppError) => {
        return this.handle_error(error);
      })
    );
  }

  delete(resource) {
    const url = this.url + '/' + resource.id;
    return this.http.delete(url).pipe(
      retry(1),
      catchError((error: AppError) => {
        return this.handle_error(error);
      })
    );
  }

  handle_error(error: AppError): Observable<any> {
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

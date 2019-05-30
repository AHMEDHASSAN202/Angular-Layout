import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { AppError } from '../errors/app-error';
import { CustomHandleErrors } from '../errors/custom-handle-errors';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private url:string, private http: HttpClient) { }

  get() {
    return this.http.get(this.url).pipe(
      retry(1),
      catchError((error: AppError) => {
        return CustomHandleErrors.handle_error(error);
      })
    );
  }

  post(resource) {
    return this.http.post(this.url, resource).pipe(
      retry(1),
      catchError((error: AppError) => {
        return CustomHandleErrors.handle_error(error);
      })
    );
  }

  update(resource) {
    const url = this.url + '/' + resource.id;
    return this.http.patch(url, resource).pipe(
      retry(1),
      catchError((error: AppError) => {
        return CustomHandleErrors.handle_error(error);
      })
    );
  }

  delete(resource) {
    const url = this.url + '/' + resource.id;
    return this.http.delete(url).pipe(
      retry(1),
      catchError((error: AppError) => {
        return CustomHandleErrors.handle_error(error);
      })
    );
  }

  create_multi_part(resource){
    var form_data = new FormData();
    for (const item in resource) {
      form_data.append(item, resource[item]);
    }
    return this.post(form_data);
  }

  update_multi_part(resource){
    var form_data = new FormData();
    for (const item in resource) {
      form_data.append(item, resource[item]);
    }
    return this.update(form_data);
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { AppError } from '../errors/app-error';
import { CustomHandleErrors } from '../errors/custom-handle-errors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public key_token = 'AD_token';
  private profile_endpoint = '';
  private login_endpoint = '';
  private logout_endpoint = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  /**
   * set Token in local storgae
  */
  set_token_in_local_storage(token) {
    localStorage.setItem(this.key_token, token);
  }

  /**
   * get token
  */
  get_token() {
    return localStorage.getItem(this.key_token);
  }

  /**
   * remove token
  */
  remove_token() {
    localStorage.removeItem(this.key_token);
  }

  /**
   * check if user is exists in any refresh page
   * if exists => return profile
   * if not exists => return false
  */
  check_login_and_get_profile() {
    return this.http.post(this.profile_endpoint, {}).pipe(
      retry(1),
      catchError((error: AppError) => {
        return CustomHandleErrors.handle_error(error);
      })
    );
  }

  /**
   * remove token and set profile null
  */
 clear() {
   this.remove_token();
    // set profile data in service
    // this.store_data.profile = null;
  }

  login(data, endpoint:string = null) {
    const url = endpoint !== null ? endpoint : this.login_endpoint;
    return this.http.post(url, data).pipe(
      retry(1),
      catchError((error: AppError) => {
        return CustomHandleErrors.handle_error(error);
      })
    );
  }

  logout(redirect = 'login') {
    return this.http.post(this.logout_endpoint, {}).pipe(
      retry(1),
      catchError((error: AppError) => {
        return CustomHandleErrors.handle_error(error);
      })
    ).subscribe((res) => {
      if (res['status']) {
        // remove token and clear profile
        this.clear();
        this.router.navigateByUrl(redirect);
      }
    });
  }

  is_authenticated(): boolean {
    const token = this.get_token();
    if (token != null) {
      return true;
    }
    return false;  
  }

}

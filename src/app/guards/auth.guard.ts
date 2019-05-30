import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      const token = this.auth.get_token();
      if (token != null) {
        /**
         * check if user is exists in any refresh page
         * if exists => return profile
         * if not exists => call clear method and navigate to login page
        */
        return await this.auth.check_login_and_get_profile().toPromise()
                            .then((res) => {
                              if (!res.status) {
                                this.auth.clear();
                                this.router.navigate(['login']);
                                return false;
                              }
                              // this.store_data.profile = res.data.profile;
                              return true;
                            });
      } else {
        return false;
      }
  }
}

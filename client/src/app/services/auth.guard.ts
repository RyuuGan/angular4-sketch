import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): Observable<boolean> {
    let $this = this;
    return this.auth
      .checkLogin()
      .map(authenticated => {
        if (authenticated) {
          return true;
        }

        $this.auth.redirectUrl = url;
        // Navigate to the login page with extras
        $this.router.navigate(['/auth/login']);

        return false;
      });

  }


}

import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PrincipalResolver implements Resolve<User> {
  constructor(private auth: AuthService) {
  }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<User> {
    return this.auth.getPrincipal();
  }
}

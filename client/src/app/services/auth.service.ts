import { Injectable } from '@angular/core';

import { User } from '../model/user';
import api from '../utils/api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerResponse } from '../model/serverResponse';

@Injectable()
export class AuthService {
  principal?: User = null;

  authenticated = false;
  loaded = false;
  redirectUrl?: string;

  constructor(private http: HttpClient,
              private notifications: NotificationsService,
              private translate: TranslateService) {
  }

  checkLogin(): Observable<boolean> {
    let $this = this;
    return this.getPrincipal()
      .pipe(
        map(function () {
          return $this.authenticated;
        })
      );
  }

  getPrincipal(): Observable<User> {
    if (this.loaded) {
      this.fetchLoaded();
    }
    return this.fetchPrincipal();
  }

  fetchPrincipal(): Observable<User> {

    if (this.authenticated) {
      this.loaded = true;
      return this.fetchLoaded();
    }
    this.loaded = false;

    let authToken = AuthService.getAuthToken();

    if (!authToken) {
      return Observable.of(null);
    }

    let config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      })
    };

    let $this = this;

    return this.http
      .get(api.scim('/principal'), config)
      .pipe(
        map((res: ServerResponse) => $this.processServerPrincipal(res))
      )
      .catch(res => $this.handleError(res));
  }

  fetchLoaded(): Observable<User> {
    return Observable.create((observer: any) => {
      observer.next(this.principal);
      observer.complete();
    });
  }

  login(creds: any) {
    let config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post(api.scim('/login'), creds, config)
      .pipe(
        map((res: ServerResponse) => this.processServerLogin(res))
      )
      .catch(err => this.handleError(err));

  }

  unsetUser(): void {
    this.authenticated = false;
    this.principal = null;
  };

  logout(): void {
    AuthService.setAuthToken();
    this.unsetUser();
  }

  checkAuth(): void {
    const jwt = AuthService.getAuthToken();
    this.authenticated = !!jwt;
  }

  setPrincipal(principal: User): void {
    this.authenticated = true;
    if (!this.principal) {
      this.principal = principal;
    } else {
      Object.assign(this.principal, principal);
    }
  }

  static getAuthToken(): string {
    return localStorage.getItem('authToken');
  }

  static setAuthToken(authToken?: string) {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // The object to be passed as a header for authenticated requests
  static getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + AuthService.getAuthToken()
    };
  }

  static getAuthConfig() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      })
    };
  }

  // Helper functions
  private processServerPrincipal(body: ServerResponse) {
    if (body.error) {
      this.logout();
    } else {
      this.setPrincipal(body.results.user);
    }
    this.loaded = true;
    return this.principal;
  }

  private processServerLogin(body: ServerResponse) {
    if (body.error) {
      this.logout();
    } else {
      AuthService.setAuthToken(body.results.authToken);
      this.setPrincipal(body.results.user);
    }
    this.loaded = true;
    return this.principal;
  }

  private handleError(error: any) {
    this.unsetUser();
    this.loaded = true;
    // In a real world app, you might use a remote logging infrastructure

    let errMsg: string;
    if (error.error) {
      const body = error || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

      if (error.status === 0 || error.status === 502) {
        this.notifications.error('', this.translate.instant('Сервер находится на профилактике. Повторите свою попытку позже.'), {
          timeOut: 10000
        });
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.of(null);
  }

}

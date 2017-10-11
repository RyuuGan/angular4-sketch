import { Injectable } from '@angular/core';

import { User } from '../model/user';
import api from '../utils/api';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  principal?: User = null;

  authenticated = false;
  loaded = false;
  redirectUrl?: string;

  constructor(private http: Http) {
  }

  checkLogin(): Observable<boolean> {
    let $this = this;
    return this.getPrincipal()
      .map(function () {
        return $this.authenticated;
      });
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

    let config = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      })
    });

    let $this = this;
    return this.http
      .get(api.makeUrl('/principal', 'scim'), config)
      .map(res => $this.processServerPrincipal(res))
      .catch(res => $this.handleError(res));
  }

  fetchLoaded(): Observable<User> {
    return Observable.create((observer: any) => {
      observer.next(this.principal);
      observer.complete();
    });
  }

  login(creds: any) {
    let config = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    return this.http
      .post(api.scim('/login'), creds, config)
      .map(res => this.processServerLogin(res))
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
    return new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      })
    });
  }

  // Helper functions
  private processServerPrincipal(res: Response) {
    let body = res.json();
    if (body.error) {
      this.logout();
    } else {
      this.setPrincipal(body.results.user);
    }
    this.loaded = true;
    return this.principal;
  }

  private processServerLogin(res: Response) {
    let body = res.json();
    if (body.error) {
      this.logout();
    } else {
      AuthService.setAuthToken(body.results.authToken);
      this.setPrincipal(body.results.user);
    }
    this.loaded = true;
    return this.principal;
  }

  private handleError(error: Response | any) {
    this.unsetUser();
    this.loaded = true;
    // In a real world app, you might use a remote logging infrastructure

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.of(null);
  }

}

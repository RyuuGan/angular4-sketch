import { AuthService } from '../services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { IRestActionInner, IRestResponse, Rest, RestHandler } from 'rest-core';

export class RestResource extends Rest {

  routingDestination: string;

  constructor(public restHandler: RestHandler, public router: Router, private auth: AuthService) {
    super(restHandler);

    router
      .events
      .filter(e => e instanceof NavigationStart)
      .subscribe((e: NavigationStart) => this.routingDestination = e.url);
  }

  $getHeaders(methodOptions?: any): any {
    let headers = super.$getHeaders(methodOptions);

    let authToken = AuthService.getAuthToken();
    if (authToken) {
      headers.Authorization = 'Bearer ' + authToken;
    }

    return headers;
  }

  $handleSuccessResponse(_options: IRestActionInner, resp: IRestResponse): any {

    let body = resp.body;

    if (!body) {
      return;
    }

    if (body.error) {

      if (body.errorCode === 'USER_NOT_AUTHENTICATED' || body.errorCode === 'TOKEN_VALIDATION_FAILED') {
        this.auth.redirectUrl = this.routingDestination;
        this.auth.logout();
        this.router.navigate(['/auth/login']);
        return;
      }

      throw body;
    }

    return body.results;
  }

}

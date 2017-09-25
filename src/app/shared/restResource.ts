import { Resource } from 'ngx-resource';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Http, Request, Response } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { NavigationStart, Router } from '@angular/router';

export class RestResource extends Resource {

  routingDestination: string;

  constructor(public http: Http, public router: Router, private auth: AuthService) {
    super(http);

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

  $responseInterceptor(observable: Observable<any>, _request?: Request): Observable<any> {

    return Observable.create((subscriber: Subscriber<any>) => {

      return observable.subscribe(
        (res: Response) => {

          let body = res.json();
          if (body.error) {

            if (body.errorCode === 'USER_NOT_AUTHENTICATED' || body.errorCode === 'TOKEN_VALIDATION_FAILED') {
              this.auth.redirectUrl = this.routingDestination;
              this.auth.logout();
              this.router.navigate(['/auth/login']);
              return;
            }

            subscriber.error(body);
            return;
          }
          subscriber.next(body.results);
        },
        (error: Response) => {
          // I also made a layer to parse errors
          subscriber.error(error);
        },
        () => subscriber.complete()
      );

    });
  }

}

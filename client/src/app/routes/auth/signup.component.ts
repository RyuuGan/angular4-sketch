import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import api from '../../utils/api';
import sha256 from '../../utils/sha256';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'cc-auth-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./login.component.scss']
})
export class SignupComponent {
  user = {
    email: '',
    lastName: '',
    firstName: '',
    password: ''
  };

  constructor(private auth: AuthService,
              private router: Router,
              private notifications: NotificationsService,
              private http: HttpClient) {
  }

  onSubmit() {
    let config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let user = Object.assign({}, this.user, { password: sha256(this.user.password) });

    return this.http
      .post(api.scim('/signup'), user, config)
      .map(res => this.processSignup(res))
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      })
      .subscribe(principal => {
        if (!principal) {
          return;
        }
        this.router.navigate(['/my']);
      });

  }

  private processSignup(res) {
    let body = res.json();
    if (body.error) {
      this.auth.logout();
      if (body.errorCode === 'BAD_REQUEST') {
        this.notifications.error('', 'Пожалуйста, укажите все обязательные поля.');
      }
      if (body.errorCode === 'USER_EXISTS') {
        this.notifications.error('', 'Пользователь с данным адресом электронной почты уже зарегестрирован.');
      }
    } else {
      AuthService.setAuthToken(body.results.authToken);
      this.auth.setPrincipal(body.results.user);
    }

    return this.auth.principal;
  }

}

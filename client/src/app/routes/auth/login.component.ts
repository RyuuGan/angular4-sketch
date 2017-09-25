import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'cc-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {
  }

  onSubmit() {
    let credentials = {
      email: this.email,
      password: this.password
    };
    let $this = this;
    this.auth
      .login(credentials)
      .subscribe((principal: User) => {
        if (!principal) {
          $this.password = '';
          return;
        }
        // Redirect to /my
        let redirectTo = $this.auth.redirectUrl || '/my';
        $this.auth.redirectUrl = '';
        $this.router.navigate([redirectTo]);
      }, () => {
        $this.password = '';
      });
  }

}

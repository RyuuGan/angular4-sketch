import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cc-auth-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  constructor(private auth: AuthService, private router: Router) {

    if (this.auth.authenticated) {
      this.router.navigate(['/my']);
    }

  }

}

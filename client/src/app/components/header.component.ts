import { Component, NgModule, OnInit } from '@angular/core';
import {
  MdButtonModule,
  MdIconModule,
  MdToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../services/header.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  principal?: User;

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              public headerService: HeaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { principal: User }) => {
        this.principal = data.principal;
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}

@NgModule({
  imports: [
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    TranslateModule,
    RouterModule,
    CommonModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent, CommonModule]
})
export class HeaderComponentModule {
}

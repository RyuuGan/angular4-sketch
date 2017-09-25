import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { LayoutComponent } from './layout.component';
import { PrincipalResolver } from '../../services/principal.resolver';
import { SignupComponent } from './signup.component';
import { SharedModule } from '../../sharedModule';

let routes: Routes;

routes = [
  {
    path: 'auth',
    component: LayoutComponent,
    resolve: {
      principal: PrincipalResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthRoutingModule {
}

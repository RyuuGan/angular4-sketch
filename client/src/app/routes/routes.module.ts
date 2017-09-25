import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { PrincipalResolver } from '../services/principal.resolver';
import { MyRoutingModule } from './my/routes.module';
import { AuthRoutingModule } from './auth/routes.module';

let routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MyRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PrincipalResolver
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

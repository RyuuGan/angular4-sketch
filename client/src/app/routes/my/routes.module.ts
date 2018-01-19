import { RouterModule, Routes } from '@angular/router';

import { MyLayoutComponent } from './layout';
import { PrincipalResolver } from '../../services/principal.resolver';
import { AuthGuard } from '../../services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../sharedModule';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material';
import { MyPaginatorIntl } from '../../MyPaginatorIntl';

let routes: Routes = [
  {
    path: 'my',
    component: MyLayoutComponent,
    resolve: {
      principal: PrincipalResolver
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: DashboardComponent
          }
        ]
      }
    ]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatPaginatorModule,
    SharedModule
  ],
  declarations: [
    MyLayoutComponent,
    DashboardComponent
  ],
  providers: [
    AuthGuard,
    PrincipalResolver,
    { provide: MatPaginatorIntl, useClass: MyPaginatorIntl }
  ],
  exports: [
    RouterModule
  ]
})

export class MyRoutingModule {
}

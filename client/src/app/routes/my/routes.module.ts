import { RouterModule, Routes } from '@angular/router';

import { MyLayoutComponent } from './layout';
import { QRCodeModule } from 'angular2-qrcode';
import { ClipboardModule } from 'ngx-clipboard/dist';
import { PrincipalResolver } from '../../services/principal.resolver';
import { AuthGuard } from '../../services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../sharedModule';
import { ResourceModule } from 'ngx-resource';
import { MdPaginatorIntl, MdPaginatorModule } from '@angular/material';
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
    ResourceModule.forRoot(),
    QRCodeModule,
    ClipboardModule,
    MdPaginatorModule,
    SharedModule
  ],
  declarations: [
    MyLayoutComponent,
    DashboardComponent
  ],
  providers: [
    AuthGuard,
    PrincipalResolver,
    { provide: MdPaginatorIntl, useClass: MyPaginatorIntl }
  ],
  exports: [
    RouterModule
  ]
})

export class MyRoutingModule {
}

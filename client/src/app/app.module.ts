import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routes/routes.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  createNewHosts,
  removeNgStyles
} from '@angularclass/hmr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MissingTranslation } from './missingTranslation';
import { HeaderService } from './services/header.service';
import { AuthService } from './services/auth.service';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MomentModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateHttpLoader(http, './i18n/', '.json'),
        deps: [Http]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslation
      }
    }),
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthService,
    HeaderService,
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
  constructor(public appRef: ApplicationRef) {
    window.document.body.classList.add('loaded');
  }

  hmrOnInit(store) {
    console.log('HMR store', store);
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

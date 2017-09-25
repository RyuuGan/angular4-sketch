import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import conf from './conf';

import '../style/app.scss';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'scale',
    theClass: 'notification'
    // TODO: override icons
    // icons: {}
  };

  constructor(private router: Router, translate: TranslateService) {
    translate.addLangs(conf.locales);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(conf.locales[0]);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(conf.locales[0]);
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let element = document.getElementsByClassName('mat-sidenav-content')[0];
        if (element) {
          element.scrollTop = 0;
        } else {
          document.body.scrollTop = 0;
        }
      }
    });
  }
}

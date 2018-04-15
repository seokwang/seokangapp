import { Component, ViewChild } from '@angular/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { FirstRunPage } from '../pages/pages';
import { MainPage } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: '로그인', component: 'LoginPage' },
    { title: '등록(새신자, 방문자)', component: 'SignupPage' },
    { title: '설정', component: 'SettingsPage' },
    { title: '만든이', component: 'MadebyPage' }
  ]

  constructor(private translate: TranslateService, platform: Platform, private config: Config
    , statusBar: StatusBar, splashScreen: SplashScreen) {
      
    const skipIntro = localStorage.getItem('skipIntro');

    if (skipIntro) {
      this.rootPage = MainPage;
    } else {
      this.rootPage = FirstRunPage;
      localStorage.setItem('skipIntro', 'true');
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


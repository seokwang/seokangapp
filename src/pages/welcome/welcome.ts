import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Churchs } from '../../mocks/providers/churchs';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  currentItems: Item[];
  constructor(public navCtrl: NavController, public items: Churchs) { 
    this.currentItems = this.items.query();
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  call(cellno) {
    location.href="tel:"+cellno;
  }

  gowebsite(url) {
    window.open(url);
  }

  sendmail(mailaddress) {
    location.href="mailto:"+mailaddress;
  }
}

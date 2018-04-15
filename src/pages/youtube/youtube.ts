import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading, LoadingController,  } from 'ionic-angular';
import { Item } from '../../models/item';
import { Youtubes } from '../../mocks/providers/youtubes';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the YoutubePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-youtube',
  templateUrl: 'youtube.html',
})

export class YoutubePage {
  // videos: Item[];
  // constructor(public navCtrl: NavController, public items: Youtubes,  private domSanitizer: DomSanitizer) { 
  //   this.videos = this.items.query();
  // }
  trustedVideoUrl: SafeResourceUrl;
  loading: Loading;

  videos: any = [
      {
          "url": "https://www.youtube.com/watch?v=3roUGgUJrzw",
              "date": "2016-05-11"
      },
      {
          "url": "https://www.youtube.com/watch?v=3roUGgUJrzw",
              "date": "2016-05-11"
      }
  ];
  constructor(public navCtrl: NavController, public items: Youtubes,  private domSanitizer: DomSanitizer,
    public loadingCtrl: LoadingController) { 
    
  }

  trustRes(url) : SafeResourceUrl {
    var video_id = url.split('v=')[1].split('&')[0];
    url = "https://www.youtube.com/embed/" + video_id;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // ionViewWillEnter(): void {
  //   this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.videos.url);

  //   this.loading = this.loadingCtrl.create({
  //       content: 'Please wait...'
  //   });

  //   this.loading.present();
  // }

  // handleIFrameLoadEvent(): void {
  //     this.loading.dismiss();
  // }


  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubePage');
  }

}

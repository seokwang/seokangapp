import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Item } from '../../models/item';
import { YtProvider } from './../../providers/yt/yt';
import { Observable } from 'rxjs/Observable';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Subscription } from 'rxjs/Subscription';
//import { jsonpCallbackContext } from '@angular/common/http';
import { Http } from '@angular/http';
import { isBlank } from 'ionic-angular/util/util';
import * as $ from 'jquery'
import { SocialSharing } from '@ionic-native/social-sharing'; //library for social-sharing

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
  videos: any = [];
  loading : any;
  channel : any;
  q : any;
  n : any;

  constructor(public http: Http, private navParams: NavParams, private ytProvider: YtProvider
    , private youtube: YoutubeVideoPlayer, private plt: Platform
    , public loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private socialSharing : SocialSharing ) {
    // youtube search api
    this.channel = this.navParams.get('channel');
    this.q = this.navParams.get('q');

    if(!this.channel) {
      this.channel = "UC3HOZBHCxOyh3hn52mRZsUw";
    }

    if(!this.q) {
      this.q = "";
    }
  }

  openVideo(video) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.id.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + video.id.videoId);
    }
  }

  shareVideoUrl(videoId) {
    return 'https://www.youtube.com/watch?v=' + videoId;
  }

  clickBtnMore(obj) {
    if(!isBlank(this.n)) {
      this.getVideos(this.n);
    }
  }

  ionViewDidLoad() {
    this.getVideos('');
  }

  getVideos(n) {
      this.showLoading();

      this.ytProvider.getSearchForChannel(this.channel, this.q, n).subscribe(
        (res) => {
          let j = res.json();
          let arrJ = [];

          try {
            this.n = j.nextPageToken;
          } catch(ex) {this.n = "";}

          arrJ = j['items'];
          this.videos = this.videos.concat(arrJ);

          if(arrJ.length < this.ytProvider.getMaxResult() || isBlank(this.n)) {
            $("#btnmore").css("display","none");
            this.showToast('top', '마지막 페이지 입니다.');
          }
        }
      );

      this.dismissLoading();
  }
  
  showLoading() {
    if(!this.loading){
        this.loading = this.loadingCtrl.create({
          spinner: 'ios',
          content: 'Please wait...'
        });
        this.loading.present();
    }
  }

  dismissLoading(){
    if(this.loading){
        this.loading.dismiss();
        this.loading = null;
    }
  }

  showToast(position: string, msg : string) {
    const toast = this.toastCtrl.create({
      message: msg,
      position: position,
      duration: 3000
    });

    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }

  private dismissHandler() {
    console.info('Toast onDidDismiss()');
  }

  //social share --start
  shareText(subject) {
    var txt = subject ;
    return txt.concat('\n - 몬트리올 서광교회');
  }

  smsShare(subject, videoId) {
    var txt = this.shareText(subject);
    var url = this.shareVideoUrl(videoId);

    this.socialSharing.shareViaSMS(url.concat('\n'+txt), "mobile-no").then(() => {
      console.log("shareViaSMS: Success");
    }).catch(() => {
      console.error("shareViaSMS: failed");
    });
  }

  regularShare(subject, image, videoId){
    var txt = this.shareText(subject);
    var url = this.shareVideoUrl(videoId);

    this.socialSharing.share(txt,'','', url);
  }

  whatsappShare(subject, image, videoId) {
    var txt = this.shareText(subject);
    var url = this.shareVideoUrl(videoId);

    this.socialSharing.shareViaWhatsApp(txt, image, url).then(() => {
      console.log("shareViaWhatsApp: Success");
    }).catch(() => {
      console.error("shareViaWhatsApp: failed");
    });
  }
  facebookShare(subject, image, videoId) {
    var txt = this.shareText(subject);
    var url = this.shareVideoUrl(videoId);

    this.socialSharing.shareViaFacebook(txt, image, url).then(() => {
      console.log("shareViaFacebook: Success");
    }).catch(() => {
      console.error("shareViaFacebook: failed");
    });
  }

  twitterShare(subject, image, videoId) {
    var txt = this.shareText(subject);
    var url = this.shareVideoUrl(videoId);

    this.socialSharing.shareViaFacebook(txt, image, url).then(() => {
      console.log("shareViaTwitter: Success");
    }).catch(() => {
      console.error("shareViaTwitter: failed");
    });
  }

  //social share --end
}

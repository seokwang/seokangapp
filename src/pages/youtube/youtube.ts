import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Item } from '../../models/item';
import { YtProvider } from './../../providers/yt/yt';
import { Observable } from 'rxjs/Observable';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

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
  videos: Observable<any[]>;

  constructor(private navParams: NavParams, private ytProvider: YtProvider, private youtube: YoutubeVideoPlayer, private plt: Platform) {
    let listId = this.navParams.get('id');

    if(!listId) {
      listId = "PLMNlAvDmnfgntWMN-t8bDo95jWPIOwkeO";
    }
    this.videos = this.ytProvider.getListVideos(listId);
  }
  
  openVideo(video) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + video.snippet.resourceId.videoId);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubePage');
  }

}

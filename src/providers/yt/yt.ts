import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the YtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YtProvider {
  apiKey = 'AIzaSyCkp0u3fZtpel_QjKBxStNfa7WTyj5e7OA';
  maxResults = 10;

  constructor(public http: Http) {}

  getApiKey() {
    return this.apiKey;
  }

  getMaxResult() {
    return this.maxResults;
  }

  getPlaylistsForChannel(channel) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20')
    .map((res) => {
      return res.json()['items'];
    })
  }
 
  getListVideos(listId) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId +'&part=snippet,id&maxResults=20')
    .map((res) => {
      return res.json()['items'];
    }, (err) =>{
      console.log(err);
    })
  }

  getSearchForChannel(channel, q, pageToken) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?key=' 
      + this.apiKey + '&q='+ q + '&order=date&channelId=' + channel + '&part=snippet,id&maxResults='+this.maxResults+'&pageToken='+pageToken)
    .map(
      (res) => {      
        return res;    
      }, (err) =>{
        console.log(err);
      }
    )
  }
 
}

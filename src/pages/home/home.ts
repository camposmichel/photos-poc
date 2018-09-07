import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedProvider } from './../../providers/feed/feed';
import Photo from '../../models/photo';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public feedPhotos: Photo[] = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private feedProvider: FeedProvider 
  ) {
  }

  ionViewDidLoad() {
    this.getFeed()
  }

  getFeed() {
    this.feedProvider.list()
    .subscribe((feed: Photo[]) => {
      console.log(JSON.stringify(feed))
      if (feed) {
        this.feedPhotos = feed
      }
    })
  }

}

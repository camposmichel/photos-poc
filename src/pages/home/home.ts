import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FeedProvider } from './../../providers/feed/feed';
import Photo from '../../models/photo';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public feedPhotos: Photo[] = []
  private backupFeed: Photo[] = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private feedProvider: FeedProvider,
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
        this.backupFeed = feed
      }
    })
  }

  searchPhotos(ev: any) {
    this.feedPhotos = this.backupFeed

    const val = ev.target.value;

    if (val && val.trim() != '' && val.length > 2) {
      this.feedPhotos = this.feedPhotos.filter((photo) => {
        return (photo.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  takePic(type: string, fab: FabContainer) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type === 'camera' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 720,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      const newId = Math.floor((Math.random() * 10000) + 1)

      let base64Image = 'data:image/jpeg;base64,' + imageData
      let newPic = new Photo()
      newPic.id = newId
      newPic.url = base64Image
      newPic.thumbnailUrl = base64Image
      newPic.title = `Foto Postada ${newId}`

      fab.close()
      this.feedPhotos.unshift(newPic)
    }, (err) => {
      console.log(err)
    });
  }

}

import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserDataService } from '../user-data.service';
import { Events } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.page.html',
  styleUrls: ['./addcard.page.scss'],
})
export class AddcardPage implements OnInit {
  link: String;
  id: String;

  title: String = '';
  front: String = '';
  back: String = '';
  quelle: String = '';
  i: number;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private storage: Storage, private route: ActivatedRoute, private camera: Camera, private UserDada: UserDataService, public events: Events) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.link = 'karten/' + this.id;
    console.log(this.link.toString());
  }

  ionViewWillEnter() {
    this.i = 0;
    const $img = $('#bild');
    $img.addClass('hide');
  }

  save() {
    $('input').remove('.cordova-camera-select');
    if (this.quelle === '') {
      this.quelle = 'data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    }
    const card = new Array(this.title, this.front, this.back, this.quelle);
    this.events.publish('card:created', '');
    this.storage.get(this.link.toString()).then((val) => {
      if (val != null && val !== undefined) {
        const msj3: Array<Array<String>> = JSON.parse(val);
        msj3.push(card);
        this.storage.set(this.link.toString(), JSON.stringify(msj3));
      } else {
        const kq: Array<Array<String>> = new Array();
        kq.push(card);
        this.storage.set(this.link.toString(), JSON.stringify(kq));
      }
      this.router.navigateByUrl('/tabs/(cards:cards/' + this.id + ')');
    });

  }

  discard() {
    $('input').remove('.cordova-camera-select');
    this.router.navigateByUrl('/tabs/(cards:cards/' + this.id + ')');
  }

  bild() {
  console.log('fge');
  const options: CameraOptions = {
  quality: 40,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  saveToPhotoAlbum: false
};

this.camera.getPicture(options).then((imageData) => {
 if (imageData != null && imageData !== undefined && imageData !== '') {
 this.quelle = 'data:image/jpeg;base64,' + imageData;
 const $img = $('#bild');
 $img.removeClass('hide');
 // tslint:disable-next-line:max-line-length
 }
}, (err) => {
});
  $('.cordova-camera-select').css('display', 'none');
  $('.cordova-camera-select').first().trigger('click');
}

}

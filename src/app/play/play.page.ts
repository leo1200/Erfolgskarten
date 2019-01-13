import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, Img } from '@ionic/angular';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  gKarten: Array<Array<String>>;
  gameKarten: Array<Array<String>>;
  alleKarten: number;
  i: number;
  thema: string;
  titel: string;
  inhalt: string;
  quelle: String = '';
  zwischen;

  constructor(public events: Events, private storage: Storage, private UserData: UserDataService, private router: Router) {
    events.subscribe('start', () => {
      console.log('h');
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.i = 0;
    this.gameKarten = this.UserData.getGame();
    console.log(JSON.stringify(this.gameKarten));
    this.gKarten = this.UserData.getGKarten();
    console.log(this.gKarten.length);
    this.thema = this.UserData.getThem();
    this.alleKarten = this.UserData.getAlleKarten();
    this.quelle = 'data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    this.setCard();
  }

  setCard() {
    const $img = $('#bild');
    $img.slideUp( 'fast', function() {
      $img.addClass('.hide');
    });
    document.getElementById('btns').style.display = 'none';
    this.titel = this.gameKarten[this.i % this.gameKarten.length][0].toString();
    this.inhalt = this.gameKarten[this.i % this.gameKarten.length][1].toString();
  }

  drehen() {
    this.quelle = this.gameKarten[this.i % this.gameKarten.length][3];
    this.inhalt = this.gameKarten[this.i % this.gameKarten.length][2].toString();
    // tslint:disable-next-line:max-line-length
    if (this.quelle != null && this.quelle !== undefined && this.quelle !== 'data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=') {
      console.log(this.quelle);
      const $img = $('#bild');
      $img.slideDown('fast');
      $img.removeClass('.hide');
    }
    document.getElementById('btns').style.display = 'block';
  }

  richtig() {
    this.quelle = 'data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    this.gKarten.push(this.gameKarten[this.i % this.gameKarten.length]);
    this.storage.set('geschafft/' + this.thema, JSON.stringify(this.gKarten)).then(() => {this.set(); });
  }

  set() {
    this.gameKarten.splice(this.i % this.gameKarten.length, 1);
    console.log(this.gKarten.length);
    this.UserData.setProgress(Math.floor((this.gKarten.length / this.alleKarten) * 100));
    if (this.gameKarten[this.i % this.gameKarten.length] != null && this.gameKarten[this.i % this.gameKarten.length] !== undefined) {
    this.setCard();
    } else {
      this.router.navigateByUrl('/tabs/(lern:lern)');
    }
  }

  falsch() {
    this.quelle = 'data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    this.i++;
    this.setCard();
  }
  }


import { AppRoutingPreloaderService } from './../app-routing-preloader-service.service';
import { Component, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, Select, Events } from '@ionic/angular';
import { Router} from '@angular/router';
import { ViewController } from '@ionic/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-lern',
  templateUrl: 'lern.page.html',
  styleUrls: ['lern.page.scss']
})
export class LernPage {
  @ViewChild(Select) select: Select;
  themen: Array<String>;
  progress: number;
  thema: String;
  alleKarten: Array<Array<String>> = new Array;
  geschafft: Array<number> = new Array;
  gKarten: Array<Array<String>> = new Array;
  gameKarten: Array<Array<String>> = new Array;
  // tslint:disable-next-line:max-line-length
  constructor (private storage: Storage, public alertController: AlertController, private changeRef: ChangeDetectorRef, public events: Events, private UserData: UserDataService, private router: Router, public preloadService: AppRoutingPreloaderService) {
    events.subscribe('thema:created', (themen) => {
      this.themen = new Array;
      this.changeRef.detectChanges();
      this.themen = themen;
      const i = this.themen.length;
      console.log(JSON.stringify(this.themen) + i);
      this.changeRef.detectChanges();
      document.getElementById('elements').style.display = 'none';
      this.thema = '';
    });
    events.subscribe('card:created', () => {
      this.thema = '';
      document.getElementById('elements').style.display = 'none';
      this.ionViewDidEnter();
    });
    this.progress = 40;
  }

  ionViewDidEnter() {
   this.themen = this.UserData.getThemen();
   this.preloadService.preloadRoute('theme');
   this.progress = this.UserData.getProgress();
   console.log('earz');
  }

  onChange(selectedValue: any): void {
    const selected: String = selectedValue.detail.text.toString();
    console.log(selected);
    if (selected !== '') {
    document.getElementById('elements').style.display = 'inline';
    this.setGame(selected);
    this.events.publish('start', '');
    }
  }

  reset() {
    this.progress = 0;
    this.gKarten = new Array;
    this.storage.set('geschafft/' + this.thema, JSON.stringify(this.gKarten)).then(() => this.setGame(this.thema));
  }

  spielen() {
    this.router.navigateByUrl('/tabs/(lern:play)');
  }

  setGame(thema) {
    this.thema = thema;
    this.storage.get('karten/' + thema).then((val) => {
        this.alleKarten = JSON.parse(val);
        const all: number = this.alleKarten.length;
        if (this.alleKarten != null) {
    this.storage.get('geschafft/' + thema).then((val2) => {
      if (val2 != null && val2 !== undefined) {
        this.gKarten = JSON.parse(val2);
        this.geschafft = new Array;
        this.gKarten.forEach((v) => this.geschafft.push(this.alleKarten.indexOf(v)));

        this.gameKarten = this.alleKarten;
        console.log(JSON.stringify(this.gameKarten));
        for (let i = this.geschafft.length - 1; i >= 0; i--) {
          this.gameKarten.splice(this.geschafft[i], 1);
        }
      } else {
        this.gameKarten = this.alleKarten;
        this.geschafft = new Array;
      }
    console.log(this.gKarten.length, this.alleKarten.length);
    const infi = Math.floor((this.gKarten.length / all) * 100);
    this.progress = infi;
    console.log(infi);
    this.UserData.setProgress(infi);
    this.UserData.setGame(this.gameKarten);
    console.log(JSON.stringify(this.gameKarten));
    this.UserData.setGKarten(this.gKarten);
    this.UserData.setThema(this.thema);
    this.UserData.setAlleKarten(all);
    });
  }});
  }


}

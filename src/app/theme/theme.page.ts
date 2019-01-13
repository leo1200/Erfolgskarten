import { UserDataService } from './../user-data.service';
import { Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import {List, Events} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage {
  themen: Array<String>;
  i;

  @ViewChild('slidingList') slidingList: List;

  // tslint:disable-next-line:max-line-length
  constructor(private storage: Storage, public alertController: AlertController, private changeRef: ChangeDetectorRef, private router: Router, public events: Events, private UserData: UserDataService) {
  }

  ionViewWillEnter() {
    if (this.themen == null || this.themen === undefined) {
    this.themen = this.UserData.getThemen();
    }
  }

  async delete(i, thema) {
    if (i > -1) {
        this.themen.splice(i, 1);
        this.storage.remove('karten/' + thema);
        this.UserData.setThemen(this.themen);
        this.UserData.saveThemen();
        await this.slidingList.closeSlidingItems();
        this.changeRef.detectChanges();
  }}


  async add() {
    const alert = await this.alertController.create({
      header: 'Geben sie ein Thema ein.',
      inputs: [
        {
          name: 'thema',
          type: 'text',
          placeholder: 'Thema'
        }
      ],
      buttons: [
        {
          text: 'nicht speichern',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'speichern',
          handler: (data) => {
            if (!this.themen.includes(data.thema)) {
            this.themen.push(data.thema);
            this.events.publish('thema:created', this.themen);
            this.changeRef.detectChanges();
            this.UserData.setThemen(this.themen);
            this.UserData.saveThemen();
            console.log(data.thema);
            } else {
                this.doppelt();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  karten(i) {
    this.router.navigateByUrl('/tabs/(cards:cards/' + i + ')');
  }

  async doppelt() {
    const alert = await this.alertController.create({
      header: 'Dieses Thema gibt es bereits!',
      message: 'Wählen Sie bitte einen anderen Namen.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirm(i, thema) {
    const alert = await this.alertController.create({
      header: 'Wollen Sie das Thema löschen?',
      message: 'Alle Karten gehen hierbei verloren.',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ja',
          handler: () => {
            console.log('Confirm Okay');
            this.delete(i, thema).then(() => {this.events.publish('thema:created', this.themen); });
          }
        }
      ]
    });

    await alert.present();
  }


}

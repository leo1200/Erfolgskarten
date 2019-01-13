import { Storage } from '@ionic/storage';
import { Component, ViewChild, OnInit} from '@angular/core';
import { List, Events } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cards',
  templateUrl: 'cards.page.html',
  styleUrls: ['cards.page.scss']
})


export class CardsPage implements OnInit {
  @ViewChild('slidingList') slidingList: List;
  cards: Array<String>;
  link: String;
  id: String;
  i;
  msj3: Array<Array<String>>;
  // tslint:disable-next-line:max-line-length
  constructor(private storage: Storage, private changeRef: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, public events: Events) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.link = 'karten/' + this.id;
    console.log(this.link.toString());
  }

  ionViewWillEnter() {
    this.storage.get(this.link.toString()).then((val) => {
      if (val != null && val !== undefined) {
        this.cards = new Array();
         this.msj3 = JSON.parse(val);
        // tslint:disable-next-line:no-shadowed-variable
        this.msj3.forEach((val: Array<String>) => {
          this.cards.push(val[0]);
          this.changeRef.detectChanges();
        });
      } else {
      }
      this.changeRef.detectChanges();
    });
  }

  ionViewWillLeave() {
    console.log('leoa');
  }

  async delete(i) {
    if (i > -1) {
        this.msj3.splice(i, 1);
        this.storage.set(this.link.toString(), JSON.stringify(this.msj3));
        this.cards.splice(i, 1);
        await this.slidingList.closeSlidingItems();
        this.changeRef.detectChanges();
        this.events.publish('card:created', '');
  }}

  addcard() {
    this.router.navigateByUrl('/tabs/(cards:addcard/' + this.id + ')');
  }

  hi() {
    console.log('hi');
  }



}

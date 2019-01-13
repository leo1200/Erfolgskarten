import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private storage: Storage, public events: Events) { }

  karten: Array<Array<Array<String>>>;
  themen: Array<String>;

  gameKarten: Array<Array<String>>;
  gKarten: Array<Array<String>>;
  alleKarten: number;
  thema: string;

  progress: number;

  initThemen() {
    this.storage.get('themen').then((val) => {
      if (val != null && val !== undefined) {
        this.themen = JSON.parse(val);
      } else {
        this.themen = new Array;
      }
  });
  }

  getThemen() {
    return this.themen;
  }

  setThemen(themen) {
    this.themen = themen;
  }

  saveThemen() {
    this.storage.set('themen', JSON.stringify(this.themen));
  }

  initKarten() {
    this.storage.get('karten').then((val) => {
      if (val != null && val !== undefined) {
        this.karten = JSON.parse(val);
      }});
    }

  getThema(thema) {
    return this.karten[this.karten.indexOf(thema)];
  }

  saveThema(thema, inhalt) {
    this.karten[this.karten.indexOf(thema)] = inhalt;
  }

  saveKarten() {
    this.storage.set('karten', JSON.stringify(this.karten));
  }

  addThema(thema) {
    this.karten.push(thema);
    this.themen.push(thema.toString());
  }

  deleteThema(i) {
    this.themen.splice(i, 1);
    this.karten.splice(i, 1);
  }

  setGame(game) {
    this.gameKarten = game;
  }
  setThema(thema) {
    this.thema = thema;
  }
  setGKarten(karten) {
    this.gKarten = karten;
  }

  getGame() {
    return this.gameKarten;
  }
  getThem() {
    return this.thema;
  }
  getGKarten() {
    return this.gKarten;
  }

  setProgress(progress) {
    this.progress = progress;
  }

  getProgress() {
    if (this.progress == null) {
      return 0;
    } else {
      return this.progress;
    }
  }

  setAlleKarten(alleKarten) {
    this.alleKarten = alleKarten;
  }

  getAlleKarten() {
    return this.alleKarten;
  }

  }

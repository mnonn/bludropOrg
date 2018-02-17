import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'home-component',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Overview</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <h2>Overview</h2>
    </ion-content>
  `
})
export class HomeComponent {

  constructor (public navCtrl: NavController) {

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scan-component',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Home</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <h2>Overview</h2>
    </ion-content>
  `
})

export class ScanComponent implements OnInit {
  constructor () {
  }

  ngOnInit () {
  }
}

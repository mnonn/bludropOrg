import { Component, OnInit } from '@angular/core';
import {ScanService} from "./scan.service";

@Component({
  selector: 'scan-component',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Scan</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content>
      <h2>Scan</h2>
      
      <button ion-button (click)="getPicture($event)">Neue Aufnahme</button>
    </ion-content>
  `
})

export class ScanComponent implements OnInit {
  constructor (private scanService: ScanService) {
  }

  ngOnInit () {
  }

  getPicture($event= null) {
    let image = this.scanService.getCameraImage();

  }
}

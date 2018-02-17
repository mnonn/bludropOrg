import { Component } from '@angular/core';

import { HomeComponent } from '../home/home.component';
import { ScanComponent } from '../scan/scan.component';

@Component({
  template: `
    <ion-tabs>
      <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>
      <ion-tab [root]="tab2Root" tabTitle="Scan" tabIcon="camera"></ion-tab>
    </ion-tabs>`
})
export class TabsComponent {

  tab1Root = HomeComponent;
  tab2Root = ScanComponent;

  constructor () {

  }
}

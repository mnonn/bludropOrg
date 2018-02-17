import { Component } from '@angular/core';

import { HomePage } from '../home/home.component';
import { ScanComponent } from '../scan/scan.component';

@Component({
  template: `
    <ion-tabs>
      <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>
      <ion-tab [root]="tab3Root" tabTitle="Scan" tabIcon="camera"></ion-tab>
      <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>
    </ion-tabs>`
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScanComponent;

  constructor () {

  }
}

import { Component, OnInit, Injector } from '@angular/core';
import { ReceiptScanStrategy } from './scan.api';
import { ScanService } from "./scan.service";

@Component({
    selector: 'scan-component',
    template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Scan</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content padding>
      <div>
        <h2>Einträge hinzufügen</h2>
        <button ion-button (click)="addNewEntry()">Neue Aufnahme</button>
        <br>
        <ion-grid no-padding>
          <ion-row *ngIf="textObject">
            <ion-col>
              <span>Genauigkeit: {{textObject?.confidence}}%</span>
            </ion-col>
          </ion-row>
          <ion-row *ngFor="let line of textObject?.lines">
            <ion-col>
              <span *ngFor="let word of line?.words; let tail = last; let idx = index">
                <span >[{{word.text}}]</span>
              </span>
              <br *ngIf="tail">
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-card  *ngIf="imagePath">
          <ion-card-content>
            <img id="pic" src="{{imagePath}}"/>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `
})

export class ScanComponent implements OnInit {

    textObject: any;
    imagePath: string;
    progress: Object[] = [];

    constructor (private scanService: ScanService,
                 private injector: Injector) {
    }

    ngOnInit () {
    }

    resetProgress () {
        this.textObject = null;
        this.imagePath = null;
        this.progress = [];
    }

    addNewEntry () {
        this.resetProgress();
        let scanStrategy = new ReceiptScanStrategy(this.injector);
        this.scanService.getCameraImage(scanStrategy).then((imageData: string) => {
            this.imagePath = imageData;
            return this.scanService.getStringFromImage(imageData, scanStrategy).then((result: Object) => {
                this.textObject = result;
            });
        });
    }

}

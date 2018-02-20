import { Component, OnInit } from '@angular/core';
import { ToastHelperService } from '../ui-helper/toast-helper.service';
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
            <ion-col *ngIf="line?.words?.length > 1">
              <span *ngFor="let word of line?.words; let tail = last; let idx = index">
                <span *ngIf="word.text?.length > 2 && idx > 0">[{{word.text}}]</span>
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
               private toast: ToastHelperService) {
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
    this.scanService.getCameraImage().then((imageData: string) => {
      this.imagePath = imageData;
      return this.scanService.getStringFromImage(imageData).then((result: Object) => {
        this.textObject = result;
      });
    });
  }

}

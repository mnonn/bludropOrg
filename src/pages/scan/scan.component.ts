import { Component, OnInit } from '@angular/core';
import { ToastHelperService } from '../ui-helper/toast-helper.service';
import { ScanService } from "./scan.service";
import Tesseract from 'tesseract.js';

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
        <button ion-button (click)="addNewEntry($event)">Neue Aufnahme</button>
        <br>
        <div *ngIf="textObject">
          <span>Accuracy: {{textObject?.confidence}}</span><br>
          <p>{{textObject?.text}}</p>
        </div>
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

  resetProgress(){
    this.textObject = null;
    this.imagePath = null;
    this.progress = [];
  }

  addNewEntry ($event = null) {
    this.resetProgress();
    this.scanService.getCameraImage().then((imageData: any) => {
      this.imagePath = imageData;
      return this.getStringFromImage(imageData);
    });
  }

  getStringFromImage (imageData: any) {
    console.time('ocr');
    const options = {
      lang: 'deu'
    };
    Tesseract.recognize(imageData, options).progress((updateObj: any) => {
      this.progress.push(updateObj);
    }).catch((e: any) => {
      console.error(e);
    }).then((result: any) => {
      this.textObject = result;
    }).finally((result: any) => {
      this.progress = null;
      this.toast.createToast('finished').present();
      console.timeEnd('ocr');
    });
  }
}

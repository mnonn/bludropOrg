import { Component, OnInit } from '@angular/core';
import { ScanService } from "./scan.service";
import Tesseract from 'tesseract.js';
import { DomSanitizer } from '@angular/platform-browser';

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
      
      <button ion-button (click)="addNewEntry($event)">Neue Aufnahme</button>
      <span>{{textObject?.confidence}}</span><br>
      <p>{{textObject?.text}}</p>
      <img id="pic" [src]="domSanitizer.bypassSecurityTrustUrl(imagePath)"/>
    </ion-content>
  `
})

export class ScanComponent implements OnInit {

  textObject: any;
  imagePath: string;

  constructor (private scanService: ScanService,
               private domSanitizer: DomSanitizer) {
  }

  ngOnInit () {
  }

  addNewEntry ($event = null) {
    this.scanService.getCameraImage().then((imageData: any) => {
      this.imagePath = imageData;
      let elem = document.getElementById('pic');
      return this.getStringFromImage(imageData);
    });
  }

  getStringFromImage (imageData: any) {
    const options = {
      lang: 'deu'
    };
    Tesseract.recognize(imageData, options)
      .progress((updateObj: any) => {
        console.log('progress: ', updateObj);
      })
      .then((result: any) => {
        this.textObject = result;
      });
  }
}

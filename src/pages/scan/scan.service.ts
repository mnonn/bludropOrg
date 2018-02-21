import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import Tesseract from 'tesseract.js';
import { AbstractScanStrategy } from './scan.api';

@Injectable()
export class ScanService {

    constructor (private camera: Camera,
                 private platform: Platform) {
    }

    getCameraImage (strategy: AbstractScanStrategy) {
        if (this.platform.is('cordova')) {
            return this.camera.getPicture(strategy.cameraOptions).then((imageData: any) => {
                return Promise.resolve(imageData);
            }).catch((e) => {
                console.error(e);
                return Promise.resolve(null);
            });
        } else {
            return Promise.resolve('assets/training/sample_2.jpg');
        }
    }

    getStringFromImage (imageData: string, strategy: AbstractScanStrategy, progressCallback: Function = (prog) => {
                            console.log(prog)
                        },
                        finallyCallback: Function = (result) => {
                            console.log(result)
                        },
                        errorHandler: Function = (e) => {
                            console.error(e)
                        }): Promise<any> {
        console.time('ocr');
        return Tesseract.recognize(imageData, strategy.ocrOptions).progress((updateObj: Object) => {
            progressCallback(updateObj);
        }).catch((e: Object) => {
            errorHandler(e);
        }).then((result: Object) => {
            strategy.textProcessing(result);
            return Promise.resolve(result);
        });
    }
}

import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';

@Injectable()
export class ScanService {

  constructor (private camera: Camera,
               private platform: Platform) {
  }

  getCameraImage () {
    if (this.platform.is('cordova')) {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      return this.camera.getPicture(options).then((imageData: any) => {
        return Promise.resolve(imageData);
      }).catch((e) => {
        console.error(e);
        return Promise.resolve(null);
      });
    } else {
      return Promise.resolve('assets/training/sample_1.jpg');
    }
  }
}

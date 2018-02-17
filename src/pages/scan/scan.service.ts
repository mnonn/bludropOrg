import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';

@Injectable()
export class ScanService {

  constructor (private camera: Camera,
               private platform: Platform) {
  }

  async getCameraImage () {
    if (this.platform.is('cordova')) {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      return await this.camera.getPicture(options);
    }
  }
}

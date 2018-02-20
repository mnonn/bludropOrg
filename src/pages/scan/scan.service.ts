import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { UtilService as __ } from '../../helper/util.service';
import Tesseract from 'tesseract.js';

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
      return Promise.resolve('assets/training/sample_2.jpg');
    }
  }

  getStringFromImage (imageData: string, progressCallback: Function = (prog) => {
                        console.log(prog)
                      },
                      finallyCallback: Function = (result) => {
                        console.log(result)
                      },
                      errorHandler: Function = (e) => {
                        console.error(e)
                      }): Promise<any> {
    console.time('ocr');
    const options = {
      lang: 'deu',
      tessedit_char_blacklist: '\`\'[]?!:;*@€$%&()={}§\"#~<>|'
    };
    return Tesseract.recognize(imageData, options).progress((updateObj: Object) => {
      progressCallback(updateObj);
    }).catch((e: Object) => {
      errorHandler(e);
    }).then((result: Object) => {
      return Promise.resolve(result);
    });
  }

  cleanOCRText (ocrResult: Object): any {
    let lines = ocrResult[ 'lines' ];
    if (__.isNotEmptyArray(lines)) {
      lines.forEach((line: any) => {
        if (__.isNotEmptyArray(line[ 'words' ])) {
          for (let i = 0; i < line[ 'words' ].length; i++) {
            let word = line['words'][i];
            //validate words
            //TODO parse numbers -> prices, ids
            if(word.length < 1 || i < 1) {
              line['words'].splice(i,1);
            }
          }
        }
      })
    }
    return ocrResult;
  }
}

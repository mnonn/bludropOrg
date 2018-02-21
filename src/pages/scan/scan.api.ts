import { CameraOptions, Camera } from "@ionic-native/camera";
import { UtilService as __ } from '../../helper/util.service';
import { Injector } from "@angular/core";

export class Entry {
    name: string;
    price: number;
    quantity: number;
    image: any; //TODO check for correct typing
}

export class OcrOptions {
    lang: string;
    tessedit_char_blacklist: string;
}

export interface ScanStrategy {
    cameraOptions: CameraOptions;
    ocrOptions: OcrOptions;

    textProcessing(imageData: Object): Object;
}

export abstract class AbstractScanStrategy implements ScanStrategy {

    cameraOptions: CameraOptions;
    ocrOptions: OcrOptions;

    protected camera: Camera;

    constructor (injector: Injector) {
        this.camera = injector.get(Camera);
    }

    textProcessing (imageData: Object): Object {
        return null;
    }
}

export class ReceiptScanStrategy extends AbstractScanStrategy {

    cameraOptions: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };
    ocrOptions: OcrOptions = {
        lang: 'deu',
        tessedit_char_blacklist: '\`\'[]?!:;*@€$%&()={}§\"#~<>|'
    };

    textProcessing (ocrResult: Object): Object {
        let lines = ocrResult[ 'lines' ];
        if (__.isNotEmptyArray(lines)) {
            lines.forEach((line: any) => {
                if (__.isNotEmptyArray(line[ 'words' ])) {
                    for (let i = 0; i < line[ 'words' ].length; i++) {
                        let word = line[ 'words' ][ i ];
                        //validate words
                        //TODO parse numbers -> prices, ids
                        if (word.length < 2 || i < 1) {
                            line[ 'words' ].splice(i, 1);
                        }
                    }
                    let parsedNr = Number(line[ 'words' ][ line[ 'words' ].length - 1 ].text.replace(',', '.'));
                    if (isNaN(parsedNr)) {
                        line[ 'words' ].splice(line[ 'words' ].length - 1, 1);
                    }
                }
            })
        }
        return ocrResult;
    }

}

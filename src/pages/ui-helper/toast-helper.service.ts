import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastHelperService {

  constructor (private toastCtrl: ToastController) {
  }

  createToast (msg: string): any {
    return this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
  }
}

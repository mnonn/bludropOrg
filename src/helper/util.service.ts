import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor () {
  }

  static isNotEmptyArray (array: any[]): boolean {
    return typeof array != 'undefined'
      && array != null
      && array.length != null
      && array.length > 0;
  }

  static isValid(input: any): boolean {
    return input !== 'undefined' && input !== null;
  }
}

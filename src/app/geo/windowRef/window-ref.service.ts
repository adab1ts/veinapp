import { Injectable } from '@angular/core';

const getWindow = (): any => {
  return window;
};

@Injectable()
export class WindowRefService {

  get nativeWindow(): any {
    return getWindow();
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { WindowRefService } from '../windowRef/window-ref.service';

export const GEOLOCATION_ERRORS = {
  unsupportedBrowser: 'Your browser does not support the HTML5 Geolocation API',
  permissionDenied: 'Error: PERMISSION_DENIED: User denied access to their location',
  positionUnavailable: 'Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached',
  timeout: 'Error: TIMEOUT: Calculating the user location took too long',
  unexpected: 'Unexpected error'
};

@Injectable()
export class GeolocationService {

  constructor(private winRef: WindowRefService) {}

  public getLocation(opts: any = {}): Observable<any> {
    const navigator = this.winRef.nativeWindow.navigator;
    const SUBJECT = new Subject<any>();

    if (typeof navigator !== 'undefined'
      && typeof navigator.geolocation !== 'undefined') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          SUBJECT.next({
            lat: position.coords.latitude,
            long: position.coords.longitude
          });
        },
        (error) => {
          switch (error.code) {
            case 1:
              SUBJECT.error(GEOLOCATION_ERRORS.permissionDenied);
              break;
            case 2:
              SUBJECT.error(GEOLOCATION_ERRORS.positionUnavailable);
              break;
            case 3:
              SUBJECT.error(GEOLOCATION_ERRORS.timeout);
              break;
            default:
              SUBJECT.error(GEOLOCATION_ERRORS.unexpected);
          }
        },
        opts);
    } else {
      SUBJECT.error(GEOLOCATION_ERRORS.unsupportedBrowser);
    }

    return SUBJECT.asObservable();

  }

}

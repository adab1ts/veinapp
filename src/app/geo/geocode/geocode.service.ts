import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MapzenGeocodeService } from './mapzen-geocode.service';

@Injectable()
export class GeocodeService {

  constructor(private mzGeocodoService: MapzenGeocodeService) {
  }

  /**
   * Returns search Result {address, long, lat} or if no result {boolean}
   * @param searchResult
   * @returns {Observable<any | boolean>}
   */
  getCoords(searchResult: any) {
    return this.mzGeocodoService.getGeocoding(searchResult);
  }

  getAddress(lat: number, long: number) {
    // return this.geocodeService.getReverseGeocoding(lat, long);
  }

}

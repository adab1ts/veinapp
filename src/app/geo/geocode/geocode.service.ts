import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MapzenGeocodeService } from './mapzen-geocode.service';
import { CurrentSearchState } from '../../state-management/states/current-search-state';

@Injectable()
export class GeocodeService {

  constructor(private mzGeocodoService: MapzenGeocodeService) {
  }

  /**
   * Returns coords [long, lat]
   * @param address
   * @returns {Observable<number[]>}
   */
  getCoords(address: string) {
    return this.mzGeocodoService.getGeocoding(address);
  }

  getAddress(lat: number, long: number) {
    // return this.geocodeService.getReverseGeocoding(lat, long);
  }

}

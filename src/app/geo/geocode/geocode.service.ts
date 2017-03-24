import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MapzenGeocodeService } from './mapzen-geocode.service';
import { Coords, GeocodeData } from '../geodata';

@Injectable()
export class GeocodeService {

  constructor(private mzGeocodoService: MapzenGeocodeService) {
  }

  /**
   * Returns search Result {address, long, lat} or if no result {boolean}
   * @param searchResult
   * @returns {Observable<any | boolean>}
   */
  getCoords(searchResult: string): Observable<GeocodeData> {
    return this.mzGeocodoService.getGeocoding(searchResult);
  }

  getAddress(coords: Coords): Observable<GeocodeData> {
     return this.mzGeocodoService.getReverseGeocoding(coords);
  }

}

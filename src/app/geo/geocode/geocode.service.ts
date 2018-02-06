import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MapboxGeocodingService } from './mapbox-geocoding.service';
import { GeocodeData } from '../geodata';

@Injectable()
export class GeocodeService {

  constructor(private geocodingService: MapboxGeocodingService) {
  }

  /**
   * Returns search Result {address, long, lat} or if no result {boolean}
   * @param searchResult
   * @returns {Observable<any|boolean>}
   */
  getCoords(searchResult: string): Observable<GeocodeData> {
    return this.geocodingService.getGeocoding(searchResult);
  }

  getAddress(coords: number[]): Observable<GeocodeData> {
     return this.geocodingService.getReverseGeocoding(coords);
  }

}

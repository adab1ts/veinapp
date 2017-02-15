import {Injectable, ComponentFactoryResolver} from '@angular/core';
import {MapzenGeocodeService} from './mapzen-geocode.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GeocodeService {

  constructor(private geocodeService: MapzenGeocodeService) { }

  /**
   * Returns coords [long, lat]
   * @param address
   * @returns {Observable<number[]>}
   */
  getCoords (address: string): Observable<number[]> {
    return this.geocodeService.getGeocoding(address);
  }

  getAddress (lat: number, long: number) {
    // return this.geocodeService.getReverseGeocoding(lat, long);
  }

}

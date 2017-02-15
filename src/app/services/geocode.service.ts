import {Injectable, ComponentFactoryResolver} from '@angular/core';
import {MapzenGeocodeService} from './mapzen-geocode.service';

@Injectable()
export class GeocodeService {

  constructor(private mapzen: MapzenGeocodeService) { }

  getCoords (address: string) {
    this.mapzen.geocoding(address);
  }

  getAddress (lat: number, long: number) {

  }

}

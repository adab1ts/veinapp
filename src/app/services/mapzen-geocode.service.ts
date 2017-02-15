import {Injectable} from '@angular/core';
import {Geocode} from './geocode';
import {Http} from '@angular/http';

@Injectable()
export class MapzenGeocodeService implements Geocode {

  baseUrl = 'https://search.mapzen.com/v1/search';

  constructor(private http: Http) {
  }

  geocoding(address: string) {

  }

  reverseGeocoding(lat: number, long: number) {

  }

}

import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import { Geocode } from './geocode';

const Mapbox = {
  apiURL: environment.mapbox.apiURL,
  apiToken: environment.mapbox.apiToken,
  searchParams: {
    'country': 'ES',
    'types': 'address',
    'autocomplete': 'false',
    'limit': '1',
    'language': 'ca'
  },
  reverseParams: {
    'types': 'address',
    'limit': '1'
  }
};

@Injectable()
export class MapboxGeocodingService implements Geocode {

  constructor(private http: Http) {}

  /**
   * Geocode an address and return its coordinates
   * @param address Address to geocode
   * @returns {Observable<any>}
   */
  getGeocoding(address: string): Observable<any> {
    const formattedAddress = this.formatAddress(address);
    const url = `${Mapbox.apiURL}/${encodeURIComponent(formattedAddress)}.json`;
    const query = Object.assign({}, Mapbox.searchParams, { 'access_token': Mapbox.apiToken });
    const params: URLSearchParams = this.buildSearchParameters(query);

    return this.getCall(url, params)
      .map(result => {
        if (!result) {
          return false;
        }
        const [longitude, latitude] = result['geometry']['coordinates']; // [long, lat]
        return { address: formattedAddress, center: [latitude, longitude] };
      });
  }

  /**
   * Return an address based on its coordinates
   * @param coords Coordinates to geocode
   */
  getReverseGeocoding(coords: number[]): Observable<any> {
    const [lat, long] = coords;
    const url = `${Mapbox.apiURL}/${long}%2C${lat}.json`;
    const query = Object.assign({}, Mapbox.reverseParams, { 'access_token': Mapbox.apiToken });
    const params: URLSearchParams = this.buildSearchParameters(query);

    return this.getCall(url, params)
      .map(result => {
        if (!result) {
          return false;
        }
        const { place_name } = result;
        const address = place_name.split(/\s*,\s*/, 2).join(', ');
        const formattedAddress = this.formatAddress(address, false);

        return { address: formattedAddress, center: coords };
      });
  }

  /**
   * Format an address before geocoding
   * @param address  Address to format
   * @param removeSN Whether remove or not S/N numbers from address
   */
  private formatAddress(address: string, removeSN: boolean = true): string {
    let formatted = address.trim().replace(/(Carrer|Calle|Cl)\s+(de\s+|d\')?/i, 'Carrer ');

    if (removeSN) {
      formatted = formatted.replace(/,?\s+s\/n/i, '');
    }

    return formatted;
  }

  /**
   * Call http get Mapbox
   * @param url
   * @param params
   * @returns {Observable<R>}
   */
  private getCall(url: string, params: URLSearchParams) {
    return this.http.get(url, { search: params })
      .map(response => response.json().features[0])
      .catch(this.handleError);
  }

  /**
   * Handle http.get error
   * @param error
   * @returns {ErrorObservable<any>}
   */
  private handleError(error: any) {
    const errMsg = error.message || 'Mapbox search server error';
    return Observable.throw(errMsg);
  }

  /**
   * Build geocoding search parameters
   * @param query Geocoding search criteria
   * @returns {URLSearchParams}
   */
  private buildSearchParameters(query: any): URLSearchParams {
    const params = new URLSearchParams();
    Object.keys(query).forEach(key => params.set(key, query[key]));

    return params;
  }

}

import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import { Geocode } from './geocode';

const Mapzen = {
  searchURL: `${environment.mapzen.apiURL}/search`,
  reverseURL: `${environment.mapzen.apiURL}/reverse`,
  searchParams: {
    'api_key': environment.mapzen.apiKey,
    'boundary.country': 'ES',
    'sources': 'oa',
    'layers': 'address',
    'size': '1'
  }
};

@Injectable()
export class MapzenGeocodeService implements Geocode {

  constructor(private http: Http) {}

  /**
   * Geocode an address and return its coordinates
   * @param address Address to geocode
   * @returns {Observable<any>}
   */
  getGeocoding(address: string): Observable<any> {
    const formattedAddress = this.formatAddress(address);
    const query = Object.assign({}, Mapzen.searchParams, { 'text': formattedAddress });
    const params: URLSearchParams = this.buildSearchParameters(query);

    return this.getCall(Mapzen.searchURL, params)
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
    const query = Object.assign({}, Mapzen.searchParams, {
      'point.lat': coords[0].toString(),
      'point.lon': coords[1].toString()
    });
    const params: URLSearchParams = this.buildSearchParameters(query);

    return this.getCall(Mapzen.reverseURL, params)
      .map(result => {
        if (!result) {
          return false;
        }
        const { street, housenumber, localadmin } = result['properties'];
        const address = `${street}, ${housenumber}, ${localadmin}`;
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
   * Call http get Mapzen
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
    const errMsg = error.message || 'Mapzen search server error';
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

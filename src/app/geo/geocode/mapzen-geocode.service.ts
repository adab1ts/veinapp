import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Geocode, GeocodeResult, } from './geocode';
import { Coords } from '../coords';
import { environment } from '../../../environments/environment';

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
   * Returns coords [long, lat]
   * @param address
   * @returns {Observable<any>}
   */
  getGeocoding(address: string): Observable<any> {
    const query = Object.assign({}, Mapzen.searchParams, { 'text': address });
    const params: URLSearchParams = this.setSearchParameters(query);

    return this.getCall(Mapzen.searchURL, params)
      .map(result => {
        if (!result) {
          return false;
        }
        const coords = result['geometry']['coordinates'];
        return { address, center: [coords[1], coords[0]] };
      });
  }

  getReverseGeocoding(coords: Coords): Observable<GeocodeResult> {
    const query = Object.assign({}, Mapzen.searchParams, {
      'point.lat': coords.lat.toString(),
      'point.lon': coords.long.toString()
    });
    const params: URLSearchParams = this.setSearchParameters(query);

    return this.getCall(Mapzen.reverseURL, params)
      .map(result => result ? { address: result['properties']['label'] } : false);
  }

  /**
   * call http get Mapzen
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
   * handle http.get error
   * @param error
   * @returns {ErrorObservable<any>}
   */
  private handleError(error: any) {
    const errMsg = error.message || 'Mapzen search server error';
    return Observable.throw(errMsg);
  }

  /**
   * set default search parameters for geolocation
   * @returns {URLSearchParams}
   */
  private setSearchParameters(query): URLSearchParams {
    const params = new URLSearchParams();
    Object.keys(query).forEach(key => params.set(key, query[key]));

    return params;
  }

}

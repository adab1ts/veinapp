import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Geocode, GeocodeResult, } from './geocode';
import { SEARCH_PARAMS, MAPZEN_SEARCH_URL, MAPZEN_REVERSE_URL } from '../../../config/mapzen.config';
import { Coords } from '../coords';

@Injectable()
export class MapzenGeocodeService implements Geocode {

  constructor(private http: Http) {
  }

  /**
   * Returns coords [long, lat]
   * @param address
   * @returns {Observable<any>}
   */
  getGeocoding(address: string): Observable<any> {
    const params: URLSearchParams = this.setSearchParameters(
      SEARCH_PARAMS, { 'text': address });

    return this.getCall(MAPZEN_SEARCH_URL, params)
      .map(result => {
        if (!result) {
          return false;
        }
        const coords = result[ 'geometry' ][ 'coordinates' ];
        return {
          address: address,
          center: [ coords[ 1 ], coords[ 0 ] ]
        };
      });
  }

  getReverseGeocoding(coords: Coords): Observable<GeocodeResult> {
    const params: URLSearchParams = this.setSearchParameters(
      SEARCH_PARAMS,
      { 'point.lat': coords.lat.toString() },
      { 'point.lon': coords.long.toString() });

    return this.getCall(MAPZEN_REVERSE_URL, params)
      .map(result => {
        return result ?
          { address: result[ 'properties' ][ 'label' ] } : false;
      });
  }

  /**
   * call http get Mapzen
   * @param url
   * @param params
   * @returns {Observable<R>}
   */
  private getCall(url: string, params: URLSearchParams) {
    return this.http.get(url, { search: params })
      .map((response: Response) => {
        return response.json().features[ 0 ];
      }).catch(this.handleError);
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
  private setSearchParameters(...more) {
    const params: URLSearchParams = new URLSearchParams();
    more.forEach((item) => {
      Object.keys(item).forEach((key) => {
        params.set(key, item[ key ]);
      });
    });

    return params;
  }

}

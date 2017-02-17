import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Geocode } from './geocode';
import { SEARCH_PARAMS, MAPZEN_BASE_URL } from '../../../config/mapzen.config';
import { CurrentSearchState } from '../../state-management/states/current-search-state';

@Injectable()
export class MapzenGeocodeService implements Geocode {

  constructor(private http: Http) {}

  /**
   * Returns coords [long, lat]
   * @param address
   * @returns {Observable<number[]>}
   */
  getGeocoding(address: string): Observable<CurrentSearchState> {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in SEARCH_PARAMS) {
      if (SEARCH_PARAMS.hasOwnProperty(key)) {
        const val = SEARCH_PARAMS[key];
        params.set(key, val);
      }
    }
    params.set('text', address);

    return this.http.get(MAPZEN_BASE_URL, {search: params})
      .map((response: Response) => {
        const coords = response.json().features[0].geometry.coordinates;
        return {
          address: address,
          lat: coords[0],
          long: coords[1]
        };

      }).catch(this.handleError);
  }

  getReverseGeocoding(lat: number, long: number) {

  }

  /**
   * handle http.get error
   * @param error
   * @returns {ErrorObservable<T>}
   */
  private handleError(error: any) {
    const errResponse = error.json().geocoding;
    const errMsg = errResponse.errors ? errResponse.errors[0] : 'Mapzen search server error';
    return Observable.throw(errMsg);
  }

}

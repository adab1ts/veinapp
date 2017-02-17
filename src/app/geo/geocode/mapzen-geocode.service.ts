import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Geocode } from './geocode';
import { SEARCH_PARAMS, MAPZEN_BASE_URL } from '../../../config/mapzen.config';
import { CurrentSearchState } from '../../state-management/states/current-search-state';
import { ResultsState } from '../../state-management/states/result-state';

@Injectable()
export class MapzenGeocodeService implements Geocode {

  constructor(private http: Http) {
  }

  /**
   * Returns coords [long, lat]
   * @param address
   * @returns {Observable<number[]>}
   */
  getGeocoding(address: string): Observable<CurrentSearchState | ResultsState> {
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

        if (response.json().features.length) {
          const coords = response.json().features[0].geometry.coordinates;
          return {
            address: address,
            lat: coords[1],
            long: coords[0]
          };
        }

        return {
          noResults: true
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
    const errMsg = error.message || 'Mapzen search server error';
    return Observable.throw(errMsg);
  }

}

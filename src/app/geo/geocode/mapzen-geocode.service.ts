import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Geocode, Coords } from './geocode';
import { SEARCH_PARAMS, MAPZEN_SEARCH_URL, MAPZEN_REVERSE_URL } from '../../../config/mapzen.config';

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
    const params: URLSearchParams = this.setSearchParameters({ 'text': address });

    return this.http.get(MAPZEN_SEARCH_URL, { search: params })
      .map((response: Response) => {
        if (response.json().features.length) {
          const coords = response.json().features[ 0 ].geometry.coordinates;
          return {
            address: address,
            lat: coords[ 1 ],
            long: coords[ 0 ]
          };
        }

        return {
          noResults: true
        };
      }).catch(this.handleError);
  }

  getReverseGeocoding(coords: Coords): Observable<any> {
    const params: URLSearchParams = this.setSearchParameters(
      { 'point.lat': coords.lat.toString() },
      { 'point.lon': coords.long.toString() }
    );

    return this.http.get(MAPZEN_REVERSE_URL, { search: params })
      .map((response: Response) => {
        if (response.json().features.length) {
          const address = response.json().features[ 0 ].properties.label;
          return {
            address: address
          };
        }

        return {
          noResults: true
        };
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
    for (const key in SEARCH_PARAMS) {
      if (SEARCH_PARAMS.hasOwnProperty(key)) {
        const val = SEARCH_PARAMS[ key ];
        params.set(key, val);
      }
    }
    more.forEach((item) => {
      Object.keys(item).forEach((key) => {
        params.set(key, item[ key ]);
      });
    });

    return params;
  }

}

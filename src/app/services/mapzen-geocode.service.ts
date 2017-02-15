import {Injectable} from '@angular/core';
import {Geocode, MAPZEN_API_KEY} from './geocode';
import {Http, URLSearchParams, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

export const MAPZEN_BASE_URL = 'https://search.mapzen.com/v1/search';
export const SEARCH_PARAMS = {
  'boundary.country': 'ES',
  'sources': 'oa',
  'layers': 'address',
  'size': '1',
  'api_key': MAPZEN_API_KEY
};

@Injectable()
export class MapzenGeocodeService implements Geocode {

  constructor(private http: Http) {}

  /**
   * Returns coords [long, lat]
   * @param address
   * @returns {Observable<number[]>}
   */
  getGeocoding(address: string): Observable<number[]> {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in SEARCH_PARAMS) {
      if (SEARCH_PARAMS.hasOwnProperty(key)) {
        const val = SEARCH_PARAMS[key];
        params.set(key, val);
      }
    }
    params.set('text', address);

    return this.http.get(MAPZEN_BASE_URL, {search: params}).map(
      (response: Response) => {
        return response.json().features[0].geometry.coordinates;
      }
    ).catch(this.handleError);
  }

  getReverseGeocoding(lat: number, long: number) {

  }

  handleError(error: any) {
    const errResponse = error.json().geocoding;
    const errMsg = errResponse.errors ? errResponse.errors[0] : 'Mapzen search server error';
    return Observable.throw(errMsg);
  }

}

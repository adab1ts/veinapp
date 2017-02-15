import {Injectable} from '@angular/core';
import {Geocode, MAPZEN_API_KEY} from './geocode';
import {Http, URLSearchParams, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MapzenGeocodeService implements Geocode {

  baseUrl = 'https://search.mapzen.com/v1/search';
  private searchParams = {
    'boundary.country': 'ES',
    'sources': 'oa',
    'layers': 'address',
    'size': '1',
    'api_key': MAPZEN_API_KEY
  };

  constructor(private http: Http) {
  }

  /**
   * Returns coords [long, lat]
   * @param address
   * @returns {Observable<number[]>}
   */
  getGeocoding(address: string): Observable<number[]> {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in this.searchParams) {
      if (this.searchParams.hasOwnProperty(key)) {
        const val = this.searchParams[key];
        params.set(key, val);
      }
    }
    params.set('text', address);

    return this.http.get(this.baseUrl, {
      search: params
    }).map(
      (response: Response) => {
        return response.json().features[0].geometry.coordinates;
      }
    )
      .catch(this.handleError);
  }

  getReverseGeocoding(lat: number, long: number) {

  }

  handleError(error: any) {
    const errResponse = error.json().geocoding;
    const errMsg = errResponse.errors ? errResponse.errors[0] : 'Mapzen search server error';
    return Observable.throw(errMsg);
  }

}

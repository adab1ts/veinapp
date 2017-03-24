import { Injectable } from '@angular/core';
import * as Geofire from 'geofire';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2';

import { GeocodeData, GeosearchResult } from '../geodata';

@Injectable()
export class GeosearchingService {

  gfRef = new Geofire(this.db.list('/coords').$ref);
  geoQuery;
  data = [];
  subject = new Subject<any>();
  initialRadius = 1;

  constructor(private db: AngularFireDatabase) {
  }

  /**
   * get new geo places given center and/or radius params {GeosearchParams}
   * @param params
   * @returns {Observable<GeosearchResult[]>}
   */
  getPlaces(params: GeocodeData): Observable<GeosearchResult[]> {

    this.data = [];

    if (typeof this.geoQuery === 'undefined') {
      this.geoQuery = this.gfRef.query(
        { center: params.center, radius: params.radius || this.initialRadius }
      );

      this.geoQuery.on('key_entered', (key, location, distance) => {
        this.data.push({
          $key: key,
          location: location,
          distance: distance
        });
      });

      this.geoQuery.on('key_exited', (key) => {
        this.data.push({ $key: key, remove: true });
      });

      this.geoQuery.on('ready', () => {
        this.subject.next(this.orderBy(this.data));
      });

    } else {
      this.updateGeoQuery(params);
    }

    return this.subject.asObservable();
  }

  /**
   * update geoQuery data criteria
   * @param params {GeosearchParams}
   */
  private updateGeoQuery(params: GeocodeData) {
    const radius = params.radius || this.geoQuery.radius() || this.initialRadius;
    const center = params.center || this.geoQuery.center();
    this.geoQuery.updateCriteria({ center: center, radius: radius });
  }

  /**
   * Order array of places by given value (default ['distance'])
   * @param data {GeosearchResult[]}
   * @param prop {string}
   * @returns {GeosearchResult[]}
   */
  private orderBy(data, prop = 'distance') {
    return data.sort((a, b) => a[prop] - b[prop]);
  }

}

import { Injectable } from '@angular/core';
import * as Geofire from 'geofire';
import { AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { GeosearchResult, GeosearchParams, GEO_KEY_ENTER, GEO_KEY_EXIT } from './geosearch';

@Injectable()
export class GeosearchingService {

  gfRef = new Geofire(this.db.list('/coords').$ref);
  geoQuery;
  subject = new Subject<GeosearchResult>();
  initialRadius = 1;

  constructor(private db: AngularFireDatabase) {
  }

  getPlaces(params: GeosearchParams): Observable<GeosearchResult> {

    if (typeof this.geoQuery === 'undefined') {
      this.geoQuery = this.gfRef.query({ center: params.center, radius: 0.05 });

      this.geoQuery.on('key_entered', (key, location, distance) => {
        this.db.object(`/places/${key}`)
          .subscribe(place => {
            this.subject.next(
              Object.assign(place, {
                location: location, distance: distance,
                action: GEO_KEY_ENTER
              }));
          });

      });
      this.geoQuery.on('key_exited', (key) => {
        this.subject.next({ $key: key, action: GEO_KEY_EXIT });
      });
    }
    this.incrementalRadiusSearch(this.geoQuery, params);

    return this.subject.asObservable();
  }


  /**
   * Experimental
   * incremental change geoQuery => updateCriteria in order to have an order by distance
   * this configuration has given good results with my configuration
   * TODO - test in various systems, think about improvement
   * @param geoQuery
   * @param params
   */
  incrementalRadiusSearch(geoQuery, params) {
    const newRadius = params.radius || this.initialRadius;
    const newCenter = params.center;

    const oldRadius = this.geoQuery.radius();
    const limitRadius = newRadius || oldRadius;
    const initRadius = newCenter || (newRadius < oldRadius) ? 0.05 : oldRadius;
    let timeout;

    geoQuery.updateCriteria({ center: newCenter, radius: initRadius });

    for (let init = initRadius; init < limitRadius; init = parseFloat((init + 0.05).toPrecision(3))) {
      timeout = setTimeout(function () {
        geoQuery.updateCriteria({ radius: init });
      }, 1000 * (init + 0.8));
    }

  }

}

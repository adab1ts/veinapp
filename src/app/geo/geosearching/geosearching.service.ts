import { Injectable } from '@angular/core';
import * as Geofire from 'geofire';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { GeosearchResult, GeosearchParams, GEO_KEY_EXIT } from './geosearch';
import { AngularFireDatabase } from 'angularfire2';

@Injectable()
export class GeosearchingService {

  gfRef = new Geofire(this.db.list('/coords').$ref);
  geoQuery;
  data = [];
  subject = new Subject<any>();
  initialRadius = 1;

  constructor(private db: AngularFireDatabase) {
  }

  getPlaces(params: GeosearchParams): Observable<GeosearchResult[]> {

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
        this.data.push({ $key: key, action: GEO_KEY_EXIT });
      });

      this.geoQuery.on('ready', () => {
        this.subject.next(this.data);
      });

    } else {
      this.updateGeoQuery(params);
    }

    return this.subject.asObservable();
  }

  /**
   * change geoQuery data criteria
   * @param params
   */
  private updateGeoQuery(params: GeosearchParams) {
    const radius = params.radius || this.geoQuery.radius() || this.initialRadius;
    const center = params.center || this.geoQuery.center();
    this.geoQuery.updateCriteria({ center: center, radius: radius });
  }

}

import { Injectable } from '@angular/core';
import * as Geofire from 'geofire';
import { AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Geosearch, GeosearchResult } from './geosearch';

@Injectable()
export class GeosearchingService {

  gfRef = new Geofire(this.db.list('/coords').$ref);
  geoQuery;

  constructor(private db: AngularFireDatabase) {
  }

  getPlaces({ long, lat, radius }: Geosearch): Observable<GeosearchResult> {
    const SUBJECT = new Subject<any>();
    const criteria = { center: [ lat, long ], radius: radius };

    if (typeof this.geoQuery !== 'undefined') {
      this.geoQuery.updateCriteria(criteria);
    } else {
      this.geoQuery = this.gfRef.query(criteria);

      this.geoQuery.on('key_entered', (key, location, distance) => {
        SUBJECT.next({
          key: key, location: location,
          distance: distance, action: 'ENTER'
        });
      });

      this.geoQuery.on('key_exited', (key) => {
        SUBJECT.next({ key: key, action: 'EXIT' });
      });

    }
    return SUBJECT.asObservable();
  }

}

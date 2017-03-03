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

  constructor(private db: AngularFireDatabase) {
  }

  getPlaces({ lat, long, radius }: GeosearchParams): Observable<GeosearchResult> {
    const criteria = { center: [ lat, long ], radius: radius };

    if (typeof this.geoQuery !== 'undefined') {
      this.geoQuery.updateCriteria(criteria);
    } else {
      this.geoQuery = this.gfRef.query(criteria);

      this.geoQuery.on('key_entered', (key, location, distance) => {
        this.db.object(`/places/${key}`)
          .subscribe(place => {
            this.subject.next(
              Object.assign(place, {
                location: location, distance: distance, action: GEO_KEY_ENTER
              }));
          });

      });

      this.geoQuery.on('key_exited', (key) => {
        this.subject.next({ $key: key, action: GEO_KEY_EXIT });
      });

    }
    return this.subject.asObservable();
  }

}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { GeosearchResult } from '../geosearching/geosearch';

@Injectable()
export class FirebaseQueryingService {

  constructor(private db: AngularFireDatabase) { }

  getData(data): Observable<GeosearchResult[]> {
    return Observable.of(data).map((items) =>
      items.map(item => {
        // exit places
        if (item.action) {
          return Observable.of(item);
        }
        // new places
        return this.db.object(`/places/${item.$key}`)
          .withLatestFrom(Observable.of({
            location: item.location,
            distance: item.distance
          }))
          .map((place) => Object.assign(place[ 0 ], place[ 1 ]));
      }))
      .mergeMap((places) => Observable.combineLatest(places));
  }

}

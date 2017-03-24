import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { GeosearchResult } from '../geodata';

@Injectable()
export class FirebaseQueryingService {

  constructor(private db: AngularFireDatabase) { }

  getData(data: GeosearchResult[]): Observable<GeosearchResult[]> {
    if (!data.length) {
      return Observable.of(data);
    }
    return Observable.of(data).map((items) =>
      items.map(item => {
        // exit places
        if (item.remove) {
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

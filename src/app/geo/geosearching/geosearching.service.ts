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
  data = [];
  subject = new Subject<any>();
  initialRadius = 1;

  constructor(private db: AngularFireDatabase) {
  }

  getPlaces(params: GeosearchParams): Observable<GeosearchResult[]> {

    if (typeof this.geoQuery === 'undefined') {
      this.geoQuery = this.gfRef.query(
        { center: params.center, radius: params.radius || this.initialRadius }
      );

      this.geoQuery.on('key_entered', (key, location, distance) => {
        console.log('KEY_ENTER:', key, location, distance);
        this.data.push({
          $key: key,
          location: location,
          distance: distance
        });
        // this.db.object(`/places/${key}`)
        //   .subscribe(place => {
        //     data.push(
        //       Object.assign(place, {
        //         location: location, distance: distance,
        //         action: GEO_KEY_ENTER
        //       }));
        //   });

      });
      this.geoQuery.on('key_exited', (key, location, distance) => {
        console.log('KEY_EXIT:', key, location, distance);
        this.data.push({ $key: key, action: GEO_KEY_EXIT });
      });
      this.geoQuery.on('ready', () => {
        console.log('READY:');
        this.subject.next(this.data);
      });
    } else {
      this.data = [];
      this.updateGeoQuery(params);
    }

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
  private updateGeoQuery(params) {
    const radius = params.radius || this.geoQuery.radius() || this.initialRadius;
    const center = params.center || this.geoQuery.center();

    this.geoQuery.updateCriteria({ center: center, radius: radius });
    //
    // for (let init = initRadius; init <= newRadius; init = parseFloat((init + 0.05).toPrecision(3))) {
    //   timeout = setTimeout(() => {
    //     geoQuery.updateCriteria({ radius: init });
    //     if (init === newRadius) {
    //       subject.next({ action: GEO_SEARCH_END });
    //     }
    //   }, 1000 * (init + 0.8));
    // }

  }

}

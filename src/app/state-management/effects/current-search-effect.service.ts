import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

import * as fromRoot from '../../state-management/reducers';
import * as search from '../actions/current-search-action';
import { GeocodeService, GeosearchingService, FirebaseQueryingService } from '../../geo/geo.module';
import { GeocodeData, GeosearchResult } from '../../geo/geodata';

@Injectable()
export class CurrentSearchEffectService {

  @Effect() changeCurrentSearchFromGeocode$ = this.actions$
    .ofType(search.ActionTypes.CHANGE_SEARCH_FROM_ADDRESS)
    .map(toPayload)
    .switchMap((payload): Observable<GeocodeData> =>
      this.geocodeService.getCoords(payload.address)
    )
    .switchMap((response: GeocodeData): Observable<GeocodeData> => {
      return this.getNewPlaces(response);
    });

  @Effect() changeCurrentSearchByRadius$ = this.actions$
    .ofType(search.ActionTypes.CHANGE_SEARCH_BY_RADIUS)
    .map(toPayload)
    .switchMap((response: GeocodeData): Observable<GeocodeData> => {
      return this.getNewPlaces(response);
    });

  @Effect() updateGeoSearch$ = this.actions$
    .ofType(search.ActionTypes.DO_GEO_SEARCH)
    .map(toPayload)
    .switchMap((payload: GeocodeData): Observable<GeosearchResult[]> => {
      return this.geosearchingService.getPlaces(payload);
    })
    .switchMap((places: GeosearchResult[]): Observable<any> => {
      return this.firebaseQueringService.getData(places);
    })
    .switchMap((places: GeosearchResult[]): Observable<any> => {
      if (!places.length) {
        return Observable.of(new search.NoResultsSearch());
      }
      return Observable.of(new search.UpdateGeosearchResults(places));
    });

  constructor(private actions$: Actions,
              private store: Store<fromRoot.State>,
              private geocodeService: GeocodeService,
              private geosearchingService: GeosearchingService,
              private firebaseQueringService: FirebaseQueryingService) {
  }

  private getNewPlaces(data: GeocodeData): Observable<any> {
    if (!data) {
      return Observable
        .of(new search.NoResultsSearch());
    }
    this.store.dispatch(go('/'));
    const changeSearch$ = Observable
      .of(new search.ChangeCurrentParams(data));
    const geoSearch$ = Observable
      .of(new search.DoGeosearch(data));

    return Observable.merge(changeSearch$, geoSearch$);
  }

}

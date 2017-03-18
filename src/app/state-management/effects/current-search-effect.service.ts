import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

import * as fromRoot from '../../state-management/reducers';
import * as search from '../actions/current-search-action';
import { GeocodeService, GeosearchingService } from '../../geo/geo.module';
import { GEO_KEY_ENTER, GEO_KEY_EXIT, GEO_SEARCH_END } from '../../geo/geosearching/geosearch';

@Injectable()
export class CurrentSearchEffectService {

  @Effect() changeCurrentSearchFromGeocode$ = this.actions$
    .ofType(search.ActionTypes.CHANGE_SEARCH_FROM_ADDRESS)
    .map(toPayload)
    .switchMap(payload =>
      this.geocodeService.getCoords(payload.address)
    )
    .switchMap(response => {
      if (!response) {
        return Observable
          .of(new search.NoResultsSearch());
      }
      this.store.dispatch(go('/'));
      const changeSearch$ = Observable
        .of(new search.ChangeCurrentCenter(response));
      const geoSearch$ = Observable
        .of(new search.DoGeoSearch(response));

      return Observable.merge(changeSearch$, geoSearch$);
    });

  @Effect() changeCurrentSearchByRadius$ = this.actions$
    .ofType(search.ActionTypes.CHANGE_SEARCH_BY_RADIUS)
    .map(toPayload)
    .switchMap(response => {
      this.store.dispatch(go('/'));
      const changeSearch$ = Observable
        .of(new search.ChangeCurrentCenter(response));
      const geoSearch$ = Observable
        .of(new search.DoGeoSearch(response));

      return Observable.merge(changeSearch$, geoSearch$);
    });

  @Effect() updateGeoSearch$ = this.actions$
    .ofType(search.ActionTypes.DO_GEO_SEARCH)
    .map(toPayload)
    .switchMap(payload => {
      return this.geosearchingService.getPlaces(payload);
    })
    .switchMap(response => {
      // TODO check if it exists a better rxjs operator option
      if (response.action === GEO_KEY_ENTER) {
        return Observable.of(new search.AddGeoPlace(response));
      }
      if (response.action === GEO_KEY_EXIT) {
        return Observable.of(new search.RemoveGeoPlace(response));
      }
      if (response.action === GEO_SEARCH_END) {
        return Observable.of(new search.ChangePending());
      }
    });

  constructor(private actions$: Actions,
              private store: Store<fromRoot.State>,
              private geocodeService: GeocodeService,
              private geosearchingService: GeosearchingService) {
  }

}

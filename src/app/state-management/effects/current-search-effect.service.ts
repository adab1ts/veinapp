import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
  CHANGE_SEARCH_FROM_ADDRESS,
  CHANGE_SEARCH_BY_RADIUS,
  DO_GEO_SEARCH,
  changeCurrentSearch,
  addGeoPlace,
  removeGeoPlace,
  doGeoSearch, noResultsSearch
} from '../actions/current-search-action';
import { GeocodeService, GeosearchingService } from '../../geo/geo.module';
import { GEO_KEY_ENTER, GEO_KEY_EXIT } from '../../geo/geosearching/geosearch';

@Injectable()
export class CurrentSearchEffectService {

  @Effect() changeCurrentSearchFromGeocode$ = this.action$
    .ofType(CHANGE_SEARCH_FROM_ADDRESS)
    .map(toPayload)
    .switchMap(payload =>
      this.geocodeService.getCoords(payload.address)
    )
    .switchMap(response => {
      if (!response) {
        return Observable
          .of(noResultsSearch());
      }
      // route
      const changeSearch$ = Observable
        .of(changeCurrentSearch(response));
      const geoSearch$ = Observable
        .of(doGeoSearch(response));

      return Observable.merge(changeSearch$, geoSearch$);
    });

  @Effect() changeCurrentSearchByRadius$ = this.action$
    .ofType(CHANGE_SEARCH_BY_RADIUS)
    .map(toPayload)
    .switchMap(response => {
      // route
      const changeSearch$ = Observable
        .of(changeCurrentSearch(response));
      const geoSearch$ = Observable
        .of(doGeoSearch(response));

      return Observable.merge(changeSearch$, geoSearch$);
    });

  @Effect() updateGeoSearch$ = this.action$
    .ofType(DO_GEO_SEARCH)
    .map(toPayload)
    .switchMap(payload => {
      return this.geosearchingService.getPlaces(payload);
    })
    .switchMap(response => {
      // TODO check if it exists a better rxjs operator option
      if (response.action === GEO_KEY_ENTER) {
        return Observable.of(addGeoPlace(response));
      }
      if (response.action === GEO_KEY_EXIT) {
        return Observable.of(removeGeoPlace(response));
      }
    });

  constructor(private action$: Actions,
              private geocodeService: GeocodeService,
              private geosearchingService: GeosearchingService) {
  }

}

import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {
  CHANGE_SEARCH_FROM_ADDRESS,
  DO_GEO_SEARCH,
  changeCurrentSearch,
  addGeoPlace,
  removeGeoPlace,
  doGeoSearch
} from '../actions/current-search-action';
import { warnSearchResult } from '../actions/search-result-action';
import { SearchingStates } from '../states/search-result-state';
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
          .of(warnSearchResult(SearchingStates.HasNoResults));
      }
      const geoSearch$ = Observable
        .of(doGeoSearch(response));
      const changeSearch$ = Observable
        .of(changeCurrentSearch(response));
      const hasResults$ = Observable
        .of(warnSearchResult(SearchingStates.HasResults));

      return Observable.merge(changeSearch$, geoSearch$, hasResults$);
    });

  @Effect() updateGeoSearch$ = this.action$
    .ofType(DO_GEO_SEARCH)
    .map(toPayload)
    .switchMap(payload => this.geosearchingService.getPlaces(payload))
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

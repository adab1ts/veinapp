import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { GeocodeService } from '../../services/geocode.services/geocode.service';
import {
  CHANGE_CURRENT_SEARCH_FROM_ADDRESS, CHANGE_SEARCH_FROM_ADDRESS,
} from '../actions/current-search-action';
import { WARN_NO_RESULT } from '../actions/result-action';

@Injectable()
export class CurrentSearchEffectService {

  @Effect() changeCurrentSearchFromGeocode$ = this.action$
    .ofType(CHANGE_SEARCH_FROM_ADDRESS)
    .map(toPayload)
    .switchMap(payload =>
      this.geocodeService.getCoords(payload.address)
    )
    .switchMap(result => {
      if (result['noResults']) {
        return Observable.of({
          type: WARN_NO_RESULT,
          payload: result
        });
      }
      return Observable.of({
        type: CHANGE_CURRENT_SEARCH_FROM_ADDRESS,
        payload: result
      });
    });

  constructor(private action$: Actions,
              private geocodeService: GeocodeService) {
  }

}

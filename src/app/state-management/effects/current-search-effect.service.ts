import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { GeocodeService } from '../../services/geocode.services/geocode.service';
import { Observable } from 'rxjs/Observable';
import { CHANGE_CURRENT_SEARCH_FROM_ADDRESS, CHANGE_SEARCH_FROM_ADDRESS } from '../actions/current-search-action';

@Injectable()
export class CurrentSearchEffectService {

  @Effect() changeCurrentSearchFromGeocode$ = this.action$
    .ofType(CHANGE_SEARCH_FROM_ADDRESS)
    .map(toPayload)
    .switchMap(payload =>
      this.geocodeService.getCoords(payload.address)
    )
    .switchMap(result => {
      return Observable.of({
        type: CHANGE_CURRENT_SEARCH_FROM_ADDRESS,
        payload: result
      });
    });

  constructor(private action$: Actions,
              private geocodeService: GeocodeService) {
  }

}

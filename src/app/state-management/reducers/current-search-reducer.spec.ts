/* tslint:disable:no-unused-variable */

import { INITIAL_CURRENT_SEARCH_STATE } from '../states/current-search-state';
import { ActionTypes } from '../actions/current-search-action';
import { reducer } from './current-search-reducer';

describe('The Current Search Reducer', () => {

  it('should handle initial current search state', () => {
    const actual = reducer(INITIAL_CURRENT_SEARCH_STATE, {type: 'INIT_STATE'});

    expect(actual.geocodeData.address).toEqual(INITIAL_CURRENT_SEARCH_STATE.geocodeData.address);
    expect(actual.geocodeData.center[0]).toEqual(INITIAL_CURRENT_SEARCH_STATE.geocodeData.center[0]);
    expect(actual.geocodeData.center[1]).toEqual(INITIAL_CURRENT_SEARCH_STATE.geocodeData.center[1]);
  });

  it('should handle a new state when we invoke a new address', () => {
    const state = {
      geocodeData: {
        address: `Carrer d'Enric Granados 5, Barcelona`,
        center: [41.3874990, 2.1625900],
        radius: 1
      },
      placesList: [],
      pending: false
    };

    const actual = reducer(state, {
      type: ActionTypes.CHANGE_CURRENT_PARAMS,
      payload: state
    });

    expect(actual.geocodeData.address).toEqual(state.geocodeData.address);
    expect(actual.geocodeData.center).toEqual(state.geocodeData.center);

  });

});

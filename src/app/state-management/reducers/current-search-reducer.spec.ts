/* tslint:disable:no-unused-variable */

import { INITIAL_CURRENT_SEARCH_STATE } from '../states/current-search-state';
import { CHANGE_CURRENT_CENTER } from '../actions/current-search-action';
import { reducer } from './current-search-reducer';

describe('The Current Search Reducer', () => {

  it('should handle initial current search state', () => {
    const actual = reducer(INITIAL_CURRENT_SEARCH_STATE, {type: 'INIT_STATE'});

    expect(actual.address).toEqual(INITIAL_CURRENT_SEARCH_STATE.address);
    expect(actual.center[0]).toEqual(INITIAL_CURRENT_SEARCH_STATE.center[0]);
    expect(actual.center[1]).toEqual(INITIAL_CURRENT_SEARCH_STATE.center[1]);
  });

  it('should handle a new state when we invoke a new address', () => {
    const state = {
      address: `Carrer d'Enric Granados 5, Barcelona`,
      center: [41.3874990, 2.1625900],
      radius: 1,
      placesList: [],
      pending: false
    };
    const actual = reducer(state, {
      type: CHANGE_CURRENT_CENTER,
      payload: state
    });

    expect(actual.address).toEqual(state.address);
    expect(actual.center).toEqual(state.center);

  });

});

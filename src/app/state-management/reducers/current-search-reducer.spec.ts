/* tslint:disable:no-unused-variable */

import { INITIAL_CURRENT_SEARCH_STATE } from '../states/current-search-state';
import { CHANGE_CURRENT_SEARCH_FROM_ADDRESS } from '../actions/current-search-action';
import { CurrentSearchReducer } from './current-search-reducer';

describe('The Current Search Reducer', () => {

  it('should handle initial current search state', () => {
    const actual = CurrentSearchReducer(INITIAL_CURRENT_SEARCH_STATE, {type: 'INIT_STATE'});

    expect(actual.address).toEqual(INITIAL_CURRENT_SEARCH_STATE.address);
    expect(actual.lat).toEqual(INITIAL_CURRENT_SEARCH_STATE.lat);
    expect(actual.long).toEqual(INITIAL_CURRENT_SEARCH_STATE.long);
  });

  it('should handle a new state when we invoke a new address', () => {
    const state = {
      address: `Carrer d'Enric Granados 5, Barcelona`,
      long: 2.1625900,
      lat: 41.3874990
    };
    const actual = CurrentSearchReducer(state, {
      type: CHANGE_CURRENT_SEARCH_FROM_ADDRESS,
      payload: state
    });

    expect(actual.address).toEqual(state.address);
    expect(actual.lat).toEqual(state.lat);
    expect(actual.long).toEqual(state.long);

  });

});

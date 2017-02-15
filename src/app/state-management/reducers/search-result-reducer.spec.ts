/* tslint:disable:no-unused-variable */

import { SearchResultReducer } from './search-result-reducer';
import { INITIAL_SEARCH_RESULT_STATE, SearchingStates } from '../states/search-result-state';
import { WARN_SEARCH_RESULT } from '../actions/search-result-action';

describe('The Search Result Reducer', () => {

  it('should handle initial search search state', () => {
    const response = SearchResultReducer(INITIAL_SEARCH_RESULT_STATE, {type: 'INIT_STATE'});
    expect(SearchingStates[response.result]).toEqual('HasResults');
  });

  it('should handle a new state when we invoke a new address and returns a valid result', () => {
    const state = {
      result: 1
    };
    const response = SearchResultReducer(state, {
      type: WARN_SEARCH_RESULT,
      payload: state
    });

    expect(SearchingStates[response.result]).toEqual('HasResults');
  });

  it('should handle a new state when we invoke a new address and returns a invalid result', () => {
    const state = {
      result: 2
    };
    const response = SearchResultReducer(state, {
      type: WARN_SEARCH_RESULT,
      payload: state
    });

    expect(SearchingStates[response.result]).toEqual('HasNoResults');
  });

});

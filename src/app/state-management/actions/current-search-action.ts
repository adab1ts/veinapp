import { Action } from '@ngrx/store';

import { CurrentSearchState } from '../states/current-search-state';

// **
// @Effects actions
// **
export const CHANGE_SEARCH_FROM_ADDRESS = 'CHANGE_SEARCH_FROM_ADDRESS';
export const changeSearchFromAddress = (address: string): Action => ({
  type: CHANGE_SEARCH_FROM_ADDRESS,
  payload: {
    address
  }
});
// **
// Reducer actions
// **
export const CHANGE_CURRENT_SEARCH_FROM_ADDRESS = 'CHANGE_CURRENT_SEARCH_FROM_ADDRESS';
export const changeCurrentSearchFromAddress = (search: CurrentSearchState): Action => ({
  type: CHANGE_CURRENT_SEARCH_FROM_ADDRESS,
  payload: search
});

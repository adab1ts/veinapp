import { Action } from '@ngrx/store';

import { SearchingStates } from '../states/search-result-state';

// **
// Reducer actions
// **

export const WARN_SEARCH_RESULT = 'WARN_SEARCH_RESULT';
export const warnSearchResult = (result: SearchingStates): Action => ({
  type: WARN_SEARCH_RESULT,
  payload: {
    result
  }
});


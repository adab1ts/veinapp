import { ActionReducer, Action } from '@ngrx/store';

import { SearchResultState, INITIAL_SEARCH_RESULT_STATE } from '../states/search-result-state';
import { WARN_NO_SEARCH_RESULT, RESET_SEARCH_RESULT_STATE } from '../actions/search-result-action';

export const SearchResultReducer: ActionReducer<SearchResultState> =
  (state: SearchResultState = INITIAL_SEARCH_RESULT_STATE,
   action: Action): SearchResultState => {
    switch (action.type) {
      case WARN_NO_SEARCH_RESULT:
        return Object.assign({}, action.payload);
      case RESET_SEARCH_RESULT_STATE:
        return action.payload;
      default:
        return state;
    }
  };

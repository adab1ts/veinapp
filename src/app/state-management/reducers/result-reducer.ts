import { ActionReducer, Action } from '@ngrx/store';

import { ResultsState, INITIAL_RESULT_STATE } from '../states/result-state';
import { WARN_NO_RESULT, RESET_RESULT_STATE } from '../actions/result-action';

export const ResultReducer: ActionReducer<ResultsState> =
  (state: ResultsState = INITIAL_RESULT_STATE,
   action: Action): ResultsState => {
    switch (action.type) {
      case WARN_NO_RESULT:
        return Object.assign({}, action.payload);
      case RESET_RESULT_STATE:
        return action.payload;
      default:
        return state;
    }
  };

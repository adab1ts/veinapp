import { ActionReducer, Action } from '@ngrx/store';

import { CurrentSearchState, INITIAL_CURRENT_SEARCH_STATE } from '../states/current-search-state';
import { CHANGE_CURRENT_SEARCH_FROM_ADDRESS } from '../actions/current-search-action';

class CurrentSearchActions {
  constructor(private state: CurrentSearchState, private action: Action) {
  }

  changeFromName() {
    return Object.assign({}, this.state, this.action.payload || this.state);
  }
}

export const CurrentSearchReducer: ActionReducer<CurrentSearchState> =
  (state: CurrentSearchState = INITIAL_CURRENT_SEARCH_STATE,
   action: Action): CurrentSearchState => {

    const actions = new CurrentSearchActions(state, action);

    switch (action.type) {
      case CHANGE_CURRENT_SEARCH_FROM_ADDRESS:
        return actions.changeFromName();
      default:
        return state;
    }
  };


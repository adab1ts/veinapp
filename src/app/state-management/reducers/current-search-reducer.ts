import { Action } from '@ngrx/store';
import { CurrentSearchState, INITIAL_CURRENT_SEARCH_STATE } from '../states/current-search-state';
import { ENTER_GEO_PLACE, EXIT_GEO_PLACE, CHANGE_CURRENT_SEARCH } from '../actions/current-search-action';

class CurrentSearchActions {
  constructor(private state: CurrentSearchState, private action: Action) {}

  change() {
    return Object.assign({}, this.state, this.action.payload);
  }

  addPlace() {
    return Object.assign({}, this.state, {
      placesList: this.state.placesList.concat(this.action.payload)
    });
  }

  removePlace() {
    return Object.assign({}, this.state, this.state, {
      placesList: this.state.placesList.filter(place => place.$key !== this.action.payload.key)
    });
  }
}


export function CurrentSearchReducer(state = INITIAL_CURRENT_SEARCH_STATE,
                                     action: Action): CurrentSearchState {
  const actions = new CurrentSearchActions(state, action);

  switch (action.type) {
    case CHANGE_CURRENT_SEARCH:
      return actions.change();
    case ENTER_GEO_PLACE:
      return actions.addPlace();
    case EXIT_GEO_PLACE:
      return actions.removePlace();
    default:
      return state;
  }
}

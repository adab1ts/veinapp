import { Action } from '@ngrx/store';
import { CurrentSearchState, INITIAL_CURRENT_SEARCH_STATE } from '../states/current-search-state';
import {
  ENTER_GEO_PLACE,
  EXIT_GEO_PLACE,
  CHANGE_CURRENT_SEARCH,
  DO_GEO_SEARCH,
  CHANGE_SEARCH_BY_RADIUS,
  CHANGE_SEARCH_FROM_ADDRESS, NO_RESULTS_SEARCH
} from '../actions/current-search-action';

class CurrentSearchActions {
  constructor(private state: CurrentSearchState, private action: Action) {}

  pending() {
    return Object.assign({}, this.state, { pending: true });
  }

  change() {
    return Object.assign({}, this.state, this.action.payload, { pending: false });
  }

  noResult() {
    return Object.assign({}, this.state, { pending: false });
  }

  addPlace() {
    return Object.assign({}, this.state, {
      pending: false,
      placesList: this.state.placesList.concat(this.action.payload)
    });
  }

  removePlace() {
    return Object.assign({}, this.state, {
      pending: false,
      placesList: this.state.placesList.filter(place => place.$key !== this.action.payload.$key)
    });
  }
}

export function CurrentSearchReducer(state = INITIAL_CURRENT_SEARCH_STATE,
                                     action: Action): CurrentSearchState {
  const actions = new CurrentSearchActions(state, action);

  switch (action.type) {
    case DO_GEO_SEARCH:
    case CHANGE_SEARCH_BY_RADIUS:
    case CHANGE_SEARCH_FROM_ADDRESS:
      return actions.pending();
    case CHANGE_CURRENT_SEARCH:
      return actions.change();
    case ENTER_GEO_PLACE:
      return actions.addPlace();
    case EXIT_GEO_PLACE:
      return actions.removePlace();
    case NO_RESULTS_SEARCH:
      // TODO - now prevents changing the state (except pending)
      // must trigger a UI warning (maybe with a geocodosearch state)
      return actions.noResult();
    default:
      return state;
  }
}

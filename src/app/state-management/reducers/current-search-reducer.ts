import { Action } from '@ngrx/store';

import * as search from '../actions/current-search-action';
import { CurrentSearchState, INITIAL_CURRENT_SEARCH_STATE } from '../states/current-search-state';


class CurrentSearchActions {
  constructor(private state, private action: Action) {}

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

export function reducer(state = INITIAL_CURRENT_SEARCH_STATE,
                                     action: search.Actions): CurrentSearchState {
  const actions = new CurrentSearchActions(state, action);

  switch (action.type) {
    case search.ActionTypes.DO_GEO_SEARCH:
    case search.ActionTypes.CHANGE_SEARCH_BY_RADIUS:
    case search.ActionTypes.CHANGE_SEARCH_FROM_ADDRESS:
      return actions.pending();
    case search.ActionTypes.CHANGE_CURRENT_CENTER:
    case search.ActionTypes.SELECTED_PLACE:
      return actions.change();
    case search.ActionTypes.ENTER_GEO_PLACE:
      return actions.addPlace();
    case search.ActionTypes.EXIT_GEO_PLACE:
      return actions.removePlace();
    case search.ActionTypes.NO_RESULTS_SEARCH:
      // TODO - now prevents changing the state (except pending)
      // must trigger a UI warning (maybe with a geocodosearch state)
      return actions.noResult();
    default:
      return state;
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
export const getRadius = (state: CurrentSearchState) => state.radius;
export const getCenter = (state: CurrentSearchState) => state.center;
export const getAddress = (state: CurrentSearchState) => state.address;
export const getPlacesList = (state: CurrentSearchState) => state.placesList;
export const getPending = (state: CurrentSearchState) => state.pending;
export const getSelectedPlace = (state: CurrentSearchState) => state.selectedPlace;

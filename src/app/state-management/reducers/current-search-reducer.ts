import { Action } from '@ngrx/store';

import * as search from '../actions/current-search-action';
import { CurrentSearchState, INITIAL_CURRENT_SEARCH_STATE } from '../states/current-search-state';

class CurrentSearchActions {
  constructor(private state, private action: Action) {}

  pending(isPending: boolean) {
    return Object.assign({}, this.state, { pending: isPending });
  }

  changeGeocodeData() {
    const newGeocodeData = Object.assign({}, this.state.geocodeData, this.action.payload);
    return Object.assign({}, this.state, { geocodeData: newGeocodeData, pending: false });
  }

  changeSelectedPlace() {
    return Object.assign({}, this.state, this.action.payload);
  }

  updatePlaces() {
    let places = [ ...this.state.placesList ];
    this.action.payload.forEach((item) => {
      if (item.remove) {
        places = places.filter(place => {
          return place.$key !== item.$key;
        });
      } else {
        places.push(item);
      }
    });
    return Object.assign({}, this.state, {
      pending: false,
      placesList: places
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
      return actions.pending(true);
    case search.ActionTypes.CHANGE_CURRENT_PARAMS:
      return actions.changeGeocodeData();
    case search.ActionTypes.SELECTED_PLACE:
      return actions.changeSelectedPlace();
    case search.ActionTypes.NO_RESULTS_SEARCH:
      return actions.pending(false);
    // TODO - now prevents changing the state (except pending)
    // must trigger a UI warning (maybe with a geocodosearch state)
    case search.ActionTypes.UPDATE_GEOSEARCH_RESULTS:
      return actions.updatePlaces();
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
export const getRadius = (state: CurrentSearchState) => state.geocodeData.radius;
export const getCenter = (state: CurrentSearchState) => state.geocodeData.center;
export const getAddress = (state: CurrentSearchState) => state.geocodeData.address;
export const getPlacesList = (state: CurrentSearchState) => state.placesList;
export const getPending = (state: CurrentSearchState) => state.pending;
export const getSelectedPlace = (state: CurrentSearchState) => state.selectedPlace;

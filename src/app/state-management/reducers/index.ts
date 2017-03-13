import * as fromSearch from './current-search-reducer';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import { CurrentSearchState } from '../states/current-search-state';
import { createSelector } from 'reselect';

/**
 * We treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  search: CurrentSearchState;
  router: fromRouter.RouterState;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  search: fromSearch.reducer,
  router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<State> =
  compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `currentSearch` state.
 */
export const getCurrentSearchState = (state: State) => state.search;

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */
export const radius = createSelector(getCurrentSearchState, fromSearch.getRadius);
export const center = createSelector(getCurrentSearchState, fromSearch.getCenter);
export const address = createSelector(getCurrentSearchState, fromSearch.getAddress);
export const places = createSelector(getCurrentSearchState, fromSearch.getPlacesList);
export const pending = createSelector(getCurrentSearchState, fromSearch.getPending);
export const selected = createSelector(getCurrentSearchState, fromSearch.getSelectedPlace);

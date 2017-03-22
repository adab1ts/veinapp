import { Action } from '@ngrx/store';

import { GeosearchResult } from '../../geo/geosearching/geosearch';
import { type } from '../../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  CHANGE_SEARCH_FROM_ADDRESS: type('[Search] Geolocate'),
  CHANGE_SEARCH_BY_RADIUS: type('[Search] Update geosearch by radius'),
  DO_GEO_SEARCH: type('[Search] Do geosearch'),
  ENTER_GEO_PLACE: type('[Search] Add geosearch'),
  EXIT_GEO_PLACE: type('[Search] Remove geosearch'),
  UPDATE_GEOSEARCH_RESULTS: type('[Search] Update places list'),
  NO_RESULTS_SEARCH: type('[Search] No results'),
  CHANGE_CURRENT_PARAMS: type('[Search] Change center or radius params'),
  SELECTED_PLACE: type('[Search] Selected place')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class ChangeSearchFromAddress implements Action {
  type = ActionTypes.CHANGE_SEARCH_FROM_ADDRESS;

  constructor(public payload: any) { }
}

export class ChangeSearchByRadius implements Action {
  type = ActionTypes.CHANGE_SEARCH_BY_RADIUS;

  constructor(public payload: any) { }
}

export class DoGeosearch implements Action {
  type = ActionTypes.DO_GEO_SEARCH;

  constructor(public payload: any) { }
}

export class ChangeCurrentParams implements Action {
  type = ActionTypes.CHANGE_CURRENT_PARAMS;

  constructor(public payload: any) { }
}

export class AddGeoPlace implements Action {
  type = ActionTypes.ENTER_GEO_PLACE;

  constructor(public payload: GeosearchResult) { }
}

export class RemoveGeoPlace implements Action {
  type = ActionTypes.EXIT_GEO_PLACE;

  constructor(public payload: GeosearchResult) { }
}

export class UpdateGeosearchResults implements Action {
  type = ActionTypes.UPDATE_GEOSEARCH_RESULTS;

  constructor(public payload: GeosearchResult[]) { }
}

export class NoResultsSearch implements Action {
  type = ActionTypes.NO_RESULTS_SEARCH;
}

export class SelectedPlace implements Action {
  type = ActionTypes.SELECTED_PLACE;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = ChangeSearchFromAddress
  | ChangeSearchByRadius
  | DoGeosearch
  | ChangeCurrentParams
  | AddGeoPlace
  | RemoveGeoPlace
  | UpdateGeosearchResults
  | NoResultsSearch
  | SelectedPlace;

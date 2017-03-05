import { Action } from '@ngrx/store';

import { GeosearchResult } from '../../geo/geosearching/geosearch';

// **
// @Effect() actions
// **
export const CHANGE_SEARCH_FROM_ADDRESS = 'CHANGE_SEARCH_FROM_ADDRESS';
export const changeSearchFromAddress = (search: any): Action => ({
  type: CHANGE_SEARCH_FROM_ADDRESS,
  payload: search
});
export const CHANGE_SEARCH_BY_RADIUS = 'CHANGE_SEARCH_BY_RADIUS';
export const changeSearchByRadius = (search: any): Action => ({
  type: CHANGE_SEARCH_BY_RADIUS,
  payload: search
});
export const DO_GEO_SEARCH = 'DO_GEO_SEARCH';
export const doGeoSearch = (search: any): Action => ({
  type: DO_GEO_SEARCH,
  payload: search
});

// **
// Reducer actions
// **
export const CHANGE_CURRENT_SEARCH = 'CHANGE_CURRENT_SEARCH';
export const changeCurrentSearch = (result: any): Action => ({
  type: CHANGE_CURRENT_SEARCH,
  payload: result
});
export const ENTER_GEO_PLACE = 'ENTER_GEO_PLACE';
export const addGeoPlace = (result: GeosearchResult): Action => ({
  type: ENTER_GEO_PLACE,
  payload: result
});
export const EXIT_GEO_PLACE = 'EXIT_GEO_PLACE';
export const removeGeoPlace = (result: GeosearchResult): Action => ({
  type: EXIT_GEO_PLACE,
  payload: result
});
export const NO_RESULTS_SEARCH = 'NO_RESULTS_SEARCH';
export const noResultsSearch = (): Action => ({
  type: NO_RESULTS_SEARCH
});

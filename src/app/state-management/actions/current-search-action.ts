import { Action } from '@ngrx/store';
import { GeosearchResult } from '../../geo/geosearching/geosearch';


// export const ActionTypes = {
//   CHANGE_SEARCH_FROM_ADDRESS: type('[Search] New search from a new address'),
//   CHANGE_SEARCH_BY_RADIUS: type('[Search] Change the radius of the current search'),
//   ADD_BOOK_FAIL: type('[Collection] Add Book Fail'),
//   REMOVE_BOOK: type('[Collection] Remove Book'),
//   REMOVE_BOOK_SUCCESS: type('[Collection] Remove Book Success'),
//   REMOVE_BOOK_FAIL: type('[Collection] Remove Book Fail'),
//   LOAD: type('[Collection] Load'),
//   LOAD_SUCCESS: type('[Collection] Load Success'),
//   LOAD_FAIL: type('[Collection] Load Fail'),
// };
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
export const SELECTED_PLACE = 'SELECTED_PLACE';
export const selectedPlace = (result: any): Action => ({
  type: SELECTED_PLACE,
  payload: result
});

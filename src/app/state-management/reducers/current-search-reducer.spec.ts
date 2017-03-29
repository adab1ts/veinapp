/* tslint:disable:no-unused-variable */
import { INITIAL_CURRENT_SEARCH_STATE } from '../states/current-search-state';
import { ActionTypes } from '../actions/current-search-action';
import {
  reducer, getRadius, getCenter, getAddress, getPlacesList, getPending,
  getSelectedPlace
} from './current-search-reducer';
import { mockState } from './current-search-reducer.mock';

describe('Current Search Reducer Actions', () => {

  it('should handle the state when a pending geo search is in process', () => {
    const newState = reducer(mockState, {
      type: ActionTypes.DO_GEO_SEARCH
    });
    expect(newState).not.toEqual(mockState);
    expect(newState.pending).toBeTruthy();
  });

  it('should handle the state when a pending change radius search is in process', () => {
    const newState = reducer(mockState, {
      type: ActionTypes.CHANGE_SEARCH_BY_RADIUS
    });
    expect(newState).not.toEqual(mockState);
    expect(newState.pending).toBeTruthy();
  });

  it('should handle the state when a pending address change search is in process', () => {
    const newState = reducer(mockState, {
      type: ActionTypes.CHANGE_SEARCH_FROM_ADDRESS
    });
    expect(newState).not.toEqual(mockState);
    expect(newState.pending).toBeTruthy();
  });

  it('should handle a search state with initial state values', () => {
    const newState = reducer(INITIAL_CURRENT_SEARCH_STATE, { type: 'INIT_STATE' });

    expect(newState).not.toEqual(mockState);
    expect(newState.geocodeData.address).toEqual(INITIAL_CURRENT_SEARCH_STATE.geocodeData.address);
    expect(newState.geocodeData.center[ 0 ]).toEqual(INITIAL_CURRENT_SEARCH_STATE.geocodeData.center[ 0 ]);
    expect(newState.geocodeData.center[ 1 ]).toEqual(INITIAL_CURRENT_SEARCH_STATE.geocodeData.center[ 1 ]);
  });

  it('should handle a new search state when we invoke a new center', () => {
    const newPayload = {
      address: `Street Mocked 333, Barcelona`,
      center: [ 42.523242, 2.00042 ],
    };
    const newState = reducer(mockState, {
      type: ActionTypes.CHANGE_CURRENT_PARAMS,
      payload: newPayload
    });

    expect(newState).not.toEqual(mockState);
    expect(newState.geocodeData.address).toEqual(newPayload.address);
    expect(newState.geocodeData.center).toEqual(newPayload.center);
  });

  it('should handle a new search state when we invoke a new radius', () => {
    const newPayload = {
      radius: 2
    };
    const newState = reducer(mockState, {
      type: ActionTypes.CHANGE_CURRENT_PARAMS,
      payload: newPayload
    });

    expect(newState).not.toEqual(mockState);
    expect(newState.geocodeData.radius).toEqual(newPayload.radius);
  });

  it('should handle a new placesList property when new geo search results are available', () => {
    const newPayload = [
      { $key: '-KfVdriJAlARLEO2N2l_', remove: true },
      { $key: '-KfVdrh0bso_sI8cvFYx', remove: true },
      { name: 'AV qqq Barcelona', $key: '-GHRDdeET3gW-Klt2fm' }
    ];

    const newState = reducer(mockState, {
      type: ActionTypes.UPDATE_GEOSEARCH_RESULTS,
      payload: newPayload
    });
    expect(newState).not.toEqual(mockState);
    expect(newState.placesList.length).toEqual(4);
  });

  it('should handle when no geo search results are provided, not changing the state', () => {
    const newState = reducer(mockState, {
      type: ActionTypes.NO_RESULTS_SEARCH
    });
    expect(newState).toEqual(mockState);
  });

  it('should handle a new selected place property when a place is selected or deselected', () => {
    const newPayload = {
        name: 'AV xxx Barcelona',
        $key: '-KfVdriJAlARLEO2N2l_'
      };

    const newState = reducer(mockState, {
      type: ActionTypes.SELECTED_PLACE,
      payload: newPayload
    });
    expect(newState).not.toEqual(mockState);
    expect(newState.selectedPlace).not.toBeNull();
    expect(newState.selectedPlace.$key).toEqual(newPayload.$key);

    const newState2 = reducer(mockState, {
      type: ActionTypes.SELECTED_PLACE,
      payload: null
    });
    expect(newState2).not.toEqual(newState);
    expect(newState2.selectedPlace).toBeNull();
  });
});

describe('Current Search Reducer Selectors', () => {

  it('should get the current search geocodeData radius value', () => {
    expect(getRadius(mockState)).toEqual(1);
  });

  it('should get the current search geocodeData center value', () => {
    expect(getCenter(mockState)).toEqual([ 41.3874990, 2.1625900 ]);
  });

  it('should get the current search geocodeData address value', () => {
    expect(getAddress(mockState)).toEqual(`Mocked St. 111, Barcelona`);
  });

  it('should get the current search placesList value', () => {
    expect(getPlacesList(mockState).length).toEqual(5);
  });

  it('should get the current search pending value', () => {
    expect(getPending(mockState)).toBeFalsy();
  });

  it('should get the current search selectedPlace value', () => {
    expect(getSelectedPlace(mockState)).toBeNull();
  });
});

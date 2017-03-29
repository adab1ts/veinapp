import {
  ChangeSearchFromAddress,
  ActionTypes,
  ChangeSearchByRadius,
  DoGeosearch,
  ChangeCurrentParams,
  UpdateGeosearchResults,
  NoResultsSearch,
  SelectedPlace
} from './current-search-action';

describe('Current Search Actions', () => {

  it('should return correct type and payload when action is `ChangeSearchFromAddress`', () => {
    const changeSearchFromAddressAction: ChangeSearchFromAddress = new ChangeSearchFromAddress({ address: 'Mock Address, 111' });
    expect(changeSearchFromAddressAction.type).toBe(ActionTypes.CHANGE_SEARCH_FROM_ADDRESS);
    expect(changeSearchFromAddressAction.payload.address).toBe('Mock Address, 111');
  });

  it('should return correct type and payload when action is `ChangeSearchByRadius`', () => {
    const changeSearchByRadiusAction: ChangeSearchByRadius = new ChangeSearchByRadius({ radius: 2 });
    expect(changeSearchByRadiusAction.type).toBe(ActionTypes.CHANGE_SEARCH_BY_RADIUS);
    expect(changeSearchByRadiusAction.payload.radius).toBe(2);
  });

  it('should return correct type and payload when action is `DoGeosearch`', () => {
    const doGeosearchAction: DoGeosearch = new DoGeosearch({
      radius: 1,
      center: [ 41.986554, 4.001212 ]
    });
    expect(doGeosearchAction.type).toBe(ActionTypes.DO_GEO_SEARCH);
    expect(doGeosearchAction.payload.radius).toBe(1);
    expect(doGeosearchAction.payload.center).toContain(41.986554);
    expect(doGeosearchAction.payload.center).toContain(4.001212);
  });

  it('should return correct type and payload when action is `ChangeCurrentParams` and changing the center', () => {
    const changeCurrentParamsAction: ChangeCurrentParams = new ChangeCurrentParams({
      address: 'Mock St. 55',
      center: [ 41.232332, 4.424242 ]
    });
    expect(changeCurrentParamsAction.type).toBe(ActionTypes.CHANGE_CURRENT_PARAMS);
    expect(changeCurrentParamsAction.payload.radius).toBeUndefined();
    expect(changeCurrentParamsAction.payload.address).toBe('Mock St. 55');
    expect(changeCurrentParamsAction.payload.center).toContain(41.232332);
    expect(changeCurrentParamsAction.payload.center).toContain(4.424242);
  });

  it('should return correct type and payload when action is `ChangeCurrentParams` and changing the radius', () => {
    const changeCurrentParamsAction: ChangeCurrentParams = new ChangeCurrentParams({
      radius: 3,
      center: [ 42.643433, 4.13333 ]
    });
    expect(changeCurrentParamsAction.type).toBe(ActionTypes.CHANGE_CURRENT_PARAMS);
    expect(changeCurrentParamsAction.payload.radius).toBe(3);
    expect(changeCurrentParamsAction.payload.address).toBeUndefined();
    expect(changeCurrentParamsAction.payload.center).toContain(42.643433);
    expect(changeCurrentParamsAction.payload.center).toContain(4.13333);
  });

  it('should return correct type and payload when action is `UpdateGeosearchResults`', () => {
    const updateGeosearchResultsAction: UpdateGeosearchResults = new UpdateGeosearchResults([
      { $key: '-KfVdrkZE_FxQxUWcIlo' },
      { $key: '-KfVdriz3vvEESXHsPFl' },
      { $key: '-KfVdrhCdDBNGZpCYQR4' },
      { $key: '-KfVdriGszwfH7ZCnbvb' },
      { $key: '-KfVdrgetqSkepk9q_1h' }
    ]);
    expect(updateGeosearchResultsAction.type).toBe(ActionTypes.UPDATE_GEOSEARCH_RESULTS);
    expect(updateGeosearchResultsAction.payload.length).toBe(5);
  });

  it('should return correct type and payload when action is `NoResultsSearch`', () => {
    const noResultsSearchAction: NoResultsSearch = new NoResultsSearch();
    expect(noResultsSearchAction.type).toBe(ActionTypes.NO_RESULTS_SEARCH);
  });

  it('should return correct type and payload when action is `SelectedPlace` and a selected place is passed', () => {
    const selectedPlaceAction: SelectedPlace = new SelectedPlace({ $key: '-KfVdrkZE_FxQxUWcIlo' });
    expect(selectedPlaceAction.type).toBe(ActionTypes.SELECTED_PLACE);
    expect(selectedPlaceAction.payload.$key).toBe('-KfVdrkZE_FxQxUWcIlo');
  });

  it('should return correct type and payload when action is `SelectedPlace` and no selected place is passed', () => {
    const selectedPlaceAction: SelectedPlace = new SelectedPlace(null);
    expect(selectedPlaceAction.type).toBe(ActionTypes.SELECTED_PLACE);
    expect(selectedPlaceAction.payload).toBeNull();
  });

});

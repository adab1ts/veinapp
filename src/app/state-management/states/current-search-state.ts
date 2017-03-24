import { GeocodeData, INIT_GEOCODE_DATA, GeosearchResult } from '../../geo/geodata';

export interface CurrentSearchState {
  geocodeData: GeocodeData;
  placesList: GeosearchResult[];
  pending: boolean;
  selectedPlace?: GeosearchResult;
}

export const INITIAL_CURRENT_SEARCH_STATE: CurrentSearchState = {
  geocodeData: INIT_GEOCODE_DATA,
  placesList: [],
  pending: false,
  selectedPlace: null
};

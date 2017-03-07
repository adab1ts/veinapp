import { GeosearchResult } from '../../geo/geosearching/geosearch';
import { INIT_COORDS } from '../../geo/coords';

export interface CurrentSearchState {
  address: string;
  center: number[];
  radius: number;
  placesList: GeosearchResult[];
  pending: boolean;
}

// TODO - put init center data in a config file ?
export const INITIAL_CURRENT_SEARCH_STATE: CurrentSearchState = {
  address: INIT_COORDS.address,
  center: [INIT_COORDS.lat, INIT_COORDS.long],
  radius: 1,
  placesList: [],
  pending: false
};

import { GeosearchResult } from '../../geo/geosearching/geosearch';
import { INIT_COORDS } from '../../geo/coords';
import { RouterState } from '@ngrx/router-store';

export interface CurrentSearchState {
  router: RouterState;
  address: string;
  center: number[];
  radius: number;
  placesList: GeosearchResult[];
  pending: boolean;
  selectedPlace?: string;
}

// TODO - put init center data in a config file ?
export const INITIAL_CURRENT_SEARCH_STATE: CurrentSearchState = {
  router: {
    path: ''
  },
  address: INIT_COORDS.address,
  center: [INIT_COORDS.lat, INIT_COORDS.long],
  radius: 1,
  placesList: [],
  pending: false,
  selectedPlace: null
};

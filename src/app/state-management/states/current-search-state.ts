import { GeosearchResult } from '../../geo/geosearching/geosearch';

export interface CurrentSearchState {
  address: string;
  center: number[];
  radius: number;
  placesList: GeosearchResult[];
  pending: boolean;
}

// TODO - put init center data in a config file ?
export const INITIAL_CURRENT_SEARCH_STATE: CurrentSearchState = {
  address: 'Carrer de la Jota 140, Barcelona',
  center: [41.429682, 2.175945],
  radius: 1,
  placesList: [],
  pending: false
};

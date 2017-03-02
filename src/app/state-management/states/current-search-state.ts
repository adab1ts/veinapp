import { GeosearchResult } from '../../geo/geosearching/geosearch';

export interface CurrentSearchState {
  address: string;
  long: number;
  lat: number;
  radius: number;
  placesList: GeosearchResult[];
}

// TODO - put init center data in a config file ?
export const INITIAL_CURRENT_SEARCH_STATE: CurrentSearchState = {
  address: 'Carrer de la Jota 140, Barcelona',
  long: 2.175945,
  lat: 41.429682,
  radius: 1,
  placesList: []
};

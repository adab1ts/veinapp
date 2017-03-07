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
  address: 'Carrer del Doctor Aiguader, 18, 08003 Barcelona',
  center: [41.382289, 2.18826],
  radius: 1,
  placesList: [],
  pending: false
};

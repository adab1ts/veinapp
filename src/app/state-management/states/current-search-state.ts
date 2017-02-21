export interface CurrentSearchState {
  address: string;
  long: number;
  lat: number;
}

export const INITIAL_CURRENT_SEARCH_STATE: CurrentSearchState = {
  address: 'Carrer de la Jota 140, Barcelona',
  long: 2.175945,
  lat: 41.429682
};

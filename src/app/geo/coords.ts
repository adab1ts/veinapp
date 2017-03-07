export interface Coords {
  lat: number;
  long: number;
  address?: string;
}

export const INIT_COORDS: Coords = {
  lat: 41.382289,
  long: 2.18826,
  address: 'Carrer del Doctor Aiguader, 18, 08003 Barcelona'
};

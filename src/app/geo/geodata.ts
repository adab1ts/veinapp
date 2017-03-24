/**
 * Coordinates as [lat: {number}, long: {number}]
 */
export interface Coords {
  center: number[];
}

/**
 * Adds the adress {string} to the given coordinate Interface
 */
export interface GeocodeData extends Coords {
  address?: string;
  radius?: number;
}

export const INIT_GEOCODE_DATA: GeocodeData = {
  center: [41.382289, 2.18826],
  address: 'Carrer del Doctor Aiguader, 18, 08003 Barcelona',
  radius: 1
};

/**
 * place data given by geofire and angularfire
 */
export interface GeosearchResult {
  $key: string;
  name?: string;
  location?: number[];
  distance?: number;
  remove?: boolean;
  address?: string;
  email?: string;
  city?: string;
  telephone?: string;
  web?: string;
  zip?: string;
}

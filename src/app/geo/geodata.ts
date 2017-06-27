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
  address: 'Carrer Doctor Aiguader, 18, Barcelona',
  radius: 1
};

/**
 * place data given by geofire and angularfire
 */
export interface GeosearchResult {
  $key: string;
  name?: string;
  address?: string;
  zip?: string;
  city?: string;
  location?: number[];
  distance?: number;
  telephone?: string;
  email?: string;
  web?: string;
  group?: string;
  type?: string;
  remove?: boolean;
}

import { Coords } from '../coords';

export interface Geocode {
  key?: string;
  getGeocoding(address: string): any;
  getReverseGeocoding(coords): any;
}

export interface GeocodeResult {
  address?: string;
  center?: Coords;
}

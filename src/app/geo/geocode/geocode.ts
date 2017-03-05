import { Coords } from '../coords';

export interface Geocode {
  key?: string;
  getGeocoding(address: string): any;
  getReverseGeocoding(coords): any;
}

export interface GeocodeResult {
  hasResults?: boolean;
  address?: string;
  center?: Coords;
  radius?: number;
}

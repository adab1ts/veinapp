export interface Coords {
  lat: number;
  long: number;
}

export interface Geocode {
  key?: string;
  getGeocoding(address: string): any;
  getReverseGeocoding(coords): any;
}

export interface GeocodeResult {
  address: string;
  lat: number;
  long: number;
  radius?: number;
}

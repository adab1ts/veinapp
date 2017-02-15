export interface Geocode {
  key?: string;
  getGeocoding(address: string): any;
  getReverseGeocoding(lat: number, long: number): any;
}


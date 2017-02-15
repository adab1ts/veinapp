export interface Geocode {
  baseUrl: string;
  geocoding(address: string): any;
  reverseGeocoding(lat: number, long: number): any;
}

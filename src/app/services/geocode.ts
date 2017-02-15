export interface Geocode {
  baseUrl: string;
  key?: string;
  getGeocoding(address: string): any;
  getReverseGeocoding(lat: number, long: number): any;
}

export const MAPZEN_API_KEY = 'mapzen-YJqMyuT';

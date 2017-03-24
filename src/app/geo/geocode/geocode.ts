export interface Geocode {
  getGeocoding(address: string): any;
  getReverseGeocoding(coords): any;
}

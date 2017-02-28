export interface Geosearch {
  lat: number;
  long: number;
  radius: number;
}
export interface GeosearchResult {
  key: string;
  location?: number[];
  distance?: number;
  action: string;
}

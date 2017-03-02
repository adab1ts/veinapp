export interface GeosearchParams {
  lat: number;
  long: number;
  radius: number;
}
export interface GeosearchResult {
  $key: string;
  name: string;
  location: number[];
  distance: number;
  action: string;
  address?: string;
  email?: string;
  city?: string;
  telephone?: string;
  web?: string;
  zip?: string;
}
export const GEO_KEY_ENTER = 'GEO_KEY_ENTER';
export const GEO_KEY_EXIT = 'GEO_KEY_EXIT';

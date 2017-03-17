import { LatLngExpression, Marker, MarkerOptions } from 'leaflet';

export class GeoMarker extends Marker {
  constructor(latlng: LatLngExpression,
              private $key?: string,
              options?: MarkerOptions) {
    super(latlng, options);
  }
}

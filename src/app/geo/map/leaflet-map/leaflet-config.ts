import { Icon, tileLayer } from 'leaflet';
import ZoomOptions = L.Control.ZoomOptions;

export class LeafletConfig {
  static INIT_ZOOM = 14;
  static CONTROL_ZOOM_POSITION: ZoomOptions = { position: 'bottomright' };

  private static MARKERS_PATH = '/assets/leaflet-icons';
  private static PlaceIcon = Icon.extend({
    options: {
      iconSize: [ 25, 25 ],
      iconAnchor: [ 0, 12 ]
    }
  });

  static CENTER_MARKER = new LeafletConfig.PlaceIcon({
    iconUrl: `${LeafletConfig.MARKERS_PATH}/marker-center-25x25.png`
  });

  static PRIMARY_MARKER = new LeafletConfig.PlaceIcon({
    iconUrl: `${LeafletConfig.MARKERS_PATH}/marker-primary-25x25.png`
  });

  static SECONDARY_MARKER = new LeafletConfig.PlaceIcon({
    iconUrl: `${LeafletConfig.MARKERS_PATH}/marker-secondary-35x35.png`
  });

  static SELECTED_MARKER = new LeafletConfig.PlaceIcon({
    iconUrl: `${LeafletConfig.MARKERS_PATH}/marker-selected-35x35.png`,
    iconSize: [ 35, 35 ],
    iconAnchor: [ 0, 17 ]
  });

  static BASE_MAPS = {
    OpenStreetMap: tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png')
  };

  static PLACE_TYPES = [
    'Associació',
    'Federació'
  ];
}

export const enum PlaceType {
  Primary,
  Secondary
};

import { Icon, tileLayer } from 'leaflet';
import ZoomOptions = L.Control.ZoomOptions;

export class LeafletConfig {
  static INIT_ZOOM = 14;
  static CONTROL_ZOOM_POSITION: ZoomOptions = { position: 'topright' };
  private static MARKERS_PATH = '../assets/leaflet-icons/';
  static CENTER_MARKER = new Icon({
    iconUrl: `${LeafletConfig.MARKERS_PATH}/marker-icon.png`,
    shadowUrl: `${LeafletConfig.MARKERS_PATH}//marker-shadow.png`,
    iconSize: [ 24, 41 ],
    shadowSize: [ 41, 41 ],
    iconAnchor: [ 0, 41 ]
  });
  static PLACE_MARKER = new Icon({
    iconUrl: `${LeafletConfig.MARKERS_PATH}/marker-icon-green.png`,
    shadowUrl: `${LeafletConfig.MARKERS_PATH}//marker-shadow.png`,
    iconSize: [ 24, 41 ],
    shadowSize: [ 41, 41 ],
    iconAnchor: [ 0, 41 ]
  });
  static BASE_MAPS = {
    OpenStreetMap: tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, 
                      Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">
                      Humanitarian OpenStreetMap Team</a>`
    })
  };
  static PLACES_LAYER_LEGEND = 'Llocs propers';
}

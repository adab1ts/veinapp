import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Map, LatLng, control, Marker, LayerGroup } from 'leaflet';

import { INIT_COORDS } from '../../coords';
import { LeafletConfig } from './leaflet-config';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: [ './leaflet-map.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletMapComponent implements OnInit {
  map;
  centerMarker;
  placesMarkers = [];
  placesLayer = new LayerGroup([]);

  @Input() set center(coords) {
    if (typeof this.map !== 'undefined') {
      this.map.panTo(coords);
      this.centerMarker.setLatLng(coords);
    }
  };

  @Input() set places(places) {
    if (typeof this.map !== 'undefined') {
      this.placesLayer.clearLayers();
      this.placesMarkers = places.reduce((acc, place) => {
        const marker = this.findMarker(this.placesMarkers, place.location) ||
          new Marker(place.location, {
            icon: LeafletConfig.PLACE_MARKER
          });
        acc.push(marker);
        return acc;
      }, []);
      this.placesMarkers
        .forEach((place) => this.placesLayer.addLayer(place));
    }
  };

  private findMarker(arr, val) {
    return arr.find((item) => item.getLatLng() === val);
  }

  ngOnInit() {
    const lat = INIT_COORDS.lat;
    const long = INIT_COORDS.long;

    if (typeof this.map === 'undefined') {
      this.map = new Map('map', {
        zoomControl: false,
        center: new LatLng(lat, long),
        zoom: LeafletConfig.INIT_ZOOM,
        layers: [
          this.placesLayer,
          LeafletConfig.BASE_MAPS.OpenStreetMap
        ],
      });
      // TODO (study better solution)
      // this weird thing corrects center position of the map on load
      setTimeout(() => this.map.invalidateSize(false), 0);

      control.zoom(LeafletConfig.CONTROL_ZOOM_POSITION).addTo(this.map);
      const layerControl = control.layers().addTo(this.map);
      layerControl.addOverlay(this.placesLayer, 'Llocs propers');
      this.centerMarker = new Marker([ lat, long ], {
        icon: LeafletConfig.CENTER_MARKER
      }).addTo(this.map);
    }

  }

}

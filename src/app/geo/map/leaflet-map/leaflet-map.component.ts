import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Map, LatLng, control, Marker, LayerGroup } from 'leaflet';

import { INIT_GEOCODE_DATA } from '../../geodata';
import { LeafletConfig } from './leaflet-config';
import { CenterMarker, PlaceMarker, PlaceMarkerFactory } from './place-marker';

// TODO: make use of @asymmetrik/angular2-leaflet
// https://www.npmjs.com/package/@asymmetrik/angular2-leaflet
@Component({
  selector: 'app-leaflet-map',
  template: `
    <div id="map"></div>
  `,
  styles: [`
    #map {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
 `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafletMapComponent implements OnInit {
  map: Map;
  centerMarker: CenterMarker;
  placesMarkers = [];
  currentPlaceKey;
  placesLayer = new LayerGroup([]);

  @Output() setSelectedPlace = new EventEmitter();

  @Input() set mapVisible(hidden) {
    if (!hidden) {
      this.resetMap();
    }
  };

  @Input() set center(center) {
    if (typeof this.map !== 'undefined') {
      this.map.panTo(center);
      this.centerMarker.setLatLng(center);
    }
  };

  @Input() set selectedPlaceKey(key) {
    const oldMarker = this.findMarkerByKey(this.placesMarkers, this.currentPlaceKey);

    if (oldMarker) {
      oldMarker.unselect();
    }
    if (key) {
      const newMarker = this.findMarkerByKey(this.placesMarkers, key);
      newMarker.select();

      this.map.panTo(newMarker.getLatLng());
    }

    this.currentPlaceKey = key;
  };

  @Input() set places(places) {
    if (typeof this.map !== 'undefined') {
      this.placesLayer.clearLayers();

      this.placesMarkers = places.reduce((acc, place) => {
        const marker = this.findMarkerByCoords(this.placesMarkers, place.location) ||
                       PlaceMarkerFactory.createMarker(place);
        marker.on('click', (e) => this.setSelectedPlace.emit(e.target.$key));

        acc.push(marker);
        return acc;
      }, []);

      this.placesMarkers.forEach((place) => this.placesLayer.addLayer(place));

      this.map.setZoom(LeafletConfig.INIT_ZOOM);
    }
  };

  ngOnInit() {
    const [centerLat, centerLong] = INIT_GEOCODE_DATA.center;
    const center = new LatLng(centerLat, centerLong);

    if (typeof this.map === 'undefined') {
      this.map = new Map('map', {
        zoomControl: false,
        center,
        zoom: LeafletConfig.INIT_ZOOM,
        layers: [
          this.placesLayer,
          LeafletConfig.BASE_MAPS.OpenStreetMap
        ],
      });

      this.resetMap();

      control.zoom(LeafletConfig.CONTROL_ZOOM_POSITION).addTo(this.map);
      this.centerMarker = new CenterMarker(center).addTo(this.map);
    }

  }

  private findMarkerByCoords(arr, val): PlaceMarker {
    return arr.find((item: PlaceMarker) => item.getLatLng() === val);
  }

  private findMarkerByKey(arr, val): PlaceMarker {
    return arr.find((item: PlaceMarker) => item.$key === val);
  }

  // TODO (study better solution)
  // this weird thing corrects center position of the map on load
  private resetMap () {
    setTimeout(() => this.map.invalidateSize(false), 100);
  }

}

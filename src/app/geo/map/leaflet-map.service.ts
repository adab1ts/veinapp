import { Injectable } from '@angular/core';
import { Map, LatLng, tileLayer, control, Icon, Marker } from 'leaflet';

@Injectable()
export class LeafletMapService {
  baseMaps: any;
  map: Map;

  constructor() {
    this.baseMaps = {
      OpenStreetMap: tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, 
                      Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">
                      Humanitarian OpenStreetMap Team</a>`
      })
    };
  }

  initMap(center, zoom) {
    if (typeof this.map === 'undefined') {
      this.map = new Map('map', {
        zoomControl: false,
        center: new LatLng(center[ 0 ], center[ 1 ]),
        zoom: zoom,
        layers: [ this.baseMaps.OpenStreetMap ]
      });
      Icon.Default.imagePath = '../assets/images/';
      control.zoom({ position: 'topright' }).addTo(this.map);
      new Marker(center).addTo(this.map);
    }
    return this.map;
  }

}

import { NgModule } from '@angular/core';

import { GeocodeService } from './geocode/geocode.service';
import { MapzenGeocodeService } from './geocode/mapzen-geocode.service';
import { WindowRefService } from './windowRef/window-ref.service';
import { GeolocationService } from './geolocation/geolocation.service';
import { GeosearchingService } from './geosearching/geosearching.service';
import { LeafletMapService } from './map/leaflet-map.service';

@NgModule({
  providers: [
    GeocodeService,
    MapzenGeocodeService,
    WindowRefService,
    GeolocationService,
    GeosearchingService,
    LeafletMapService
  ],
  declarations: []
})
export class GeoModule {
}

export {
  GeocodeService,
  GeolocationService,
  GeosearchingService,
  LeafletMapService
}

import { NgModule } from '@angular/core';

import { GeocodeService } from './geocode/geocode.service';
import { MapzenGeocodeService } from './geocode/mapzen-geocode.service';
import { WindowRefService } from './windowRef/window-ref.service';
import { GeolocationService } from './geolocation/geolocation.service';
import { GeosearchingService } from './geosearching/geosearching.service';
import { LeafletMapComponent } from './map/leaflet-map/leaflet-map.component';
import { FirebaseQueryingService } from './firebase-querying/firebase-querying.service';

@NgModule({
  providers: [
    GeocodeService,
    MapzenGeocodeService,
    WindowRefService,
    GeolocationService,
    GeosearchingService,
    FirebaseQueryingService
  ],
  declarations: [
    LeafletMapComponent
  ],
  exports: [
    LeafletMapComponent
  ]
})
export class GeoModule {
}

export {
  GeocodeService,
  GeolocationService,
  GeosearchingService,
  FirebaseQueryingService
}

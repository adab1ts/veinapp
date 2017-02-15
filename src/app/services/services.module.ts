import {NgModule} from '@angular/core';
import {GeocodeService} from './geocode.service';
import {MapzenGeocodeService} from './mapzen-geocode.service';

@NgModule()
export class ServicesModule {
  providers: [
    GeocodeService,
    MapzenGeocodeService
    ];
}

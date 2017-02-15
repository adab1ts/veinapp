import {NgModule} from '@angular/core';
import {GeocodeService} from './geocode.service';
import {MapzenGeocodeService} from './mapzen-geocode.service';

@NgModule()
export class ServicesModule {

  // TODO - provide in the corresponding module when created,
  // not the root module
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        GeocodeService,
        MapzenGeocodeService
      ]
    };
  };
}

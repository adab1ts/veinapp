import { NgModule } from '@angular/core';
import { GeoHeaderComponent } from './geo-header.component';
import { GeoSearchModule } from '../geo-search/geo-search.module';
import { CovalentCoreModule } from '@covalent/core';

@NgModule({
  imports: [
    CovalentCoreModule.forRoot(),
    GeoSearchModule
  ],
  exports: [
    GeoHeaderComponent
  ],
  declarations: [
    GeoHeaderComponent
  ]
})
export class GeoHeaderModule { }

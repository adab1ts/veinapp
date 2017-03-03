import { NgModule } from '@angular/core';
import { GeoHeaderComponent } from './geo-header.component';
import { GeoSearchModule } from '../geo-search/geo-search.module';
import { CovalentCoreModule } from '@covalent/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CovalentCoreModule.forRoot(),
    GeoSearchModule,
    SharedModule
  ],
  exports: [
    GeoHeaderComponent
  ],
  declarations: [
    GeoHeaderComponent
  ]
})
export class GeoHeaderModule { }

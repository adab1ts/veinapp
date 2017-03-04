import { NgModule } from '@angular/core';
import { InputSearchComponent } from './input-search/input-search.component';
import { CovalentSearchModule, CovalentCoreModule } from '@covalent/core';
import { CommonModule } from '@angular/common';
import { GeolocatorComponent } from './geolocator/geolocator.component';
import { RadiusFilterComponent } from './radius-filter/radius-filter.component';
import { RadiusFilterBtnComponent } from './radius-filter/radius-filter-btn/radius-filter-btn.component';

@NgModule({
  imports: [
    CommonModule,
    CovalentCoreModule.forRoot(),
    CovalentSearchModule.forRoot()
  ],
  declarations: [
    InputSearchComponent,
    GeolocatorComponent,
    RadiusFilterComponent,
    RadiusFilterBtnComponent
  ],
  exports: [
    InputSearchComponent,
    GeolocatorComponent,
    RadiusFilterComponent
  ]
})
export class GeoSearchModule {
}

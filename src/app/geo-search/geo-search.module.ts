import { NgModule } from '@angular/core';
import { InputSearchComponent } from './input-search/input-search.component';
import { CovalentSearchModule, CovalentCoreModule } from '@covalent/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CovalentCoreModule.forRoot(),
    CovalentSearchModule.forRoot()
  ],
  declarations: [ InputSearchComponent ],
  exports: [ InputSearchComponent ]
})
export class GeoSearchModule {
}

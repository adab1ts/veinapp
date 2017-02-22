import { NgModule } from '@angular/core';
import { InputSearchComponent } from './input-search/input-search.component';
import { CovalentSearchModule, CovalentCoreModule } from '@covalent/core';

@NgModule({
  imports: [
    CovalentCoreModule.forRoot(),
    CovalentSearchModule.forRoot()
  ],
  declarations: [ InputSearchComponent ],
  exports: [ InputSearchComponent ]
})
export class GeoSearchModule {
}

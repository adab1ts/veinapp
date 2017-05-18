import { NgModule } from '@angular/core';
import { CovalentCoreModule } from '@covalent/core';

import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    CovalentCoreModule.forRoot()
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    FooterComponent
  ]
})
export class FooterModule {
}

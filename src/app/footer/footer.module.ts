import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer.component';
import { CovalentCoreModule } from '@covalent/core';

@NgModule({
  imports: [
    CovalentCoreModule.forRoot(),
    SharedModule
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

import { NgModule } from '@angular/core';

import { BrandingComponent } from './branding/branding.component';
import { ActivityIndicatorComponent } from './activity-indicator/activity-indicator.component';
import { CovalentCoreModule } from '@covalent/core';

@NgModule({
  imports: [
    CovalentCoreModule.forRoot()
  ],
  exports: [
    BrandingComponent,
    ActivityIndicatorComponent
  ],
  declarations: [
    BrandingComponent,
    ActivityIndicatorComponent
  ]
})
export class SharedModule { }

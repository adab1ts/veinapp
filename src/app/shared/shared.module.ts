import { NgModule } from '@angular/core';
import { CovalentCoreModule } from '@covalent/core';
import { RouterModule } from '@angular/router';

import { BrandingComponent } from './branding/branding.component';
import { ActivityIndicatorComponent } from './activity-indicator/activity-indicator.component';

@NgModule({
  imports: [
    RouterModule,
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

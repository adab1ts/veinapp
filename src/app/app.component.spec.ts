import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CovalentCoreModule } from '@covalent/core';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { GeoHeaderComponent } from './geo-header/geo-header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PlacesComponent } from './places/places.component';
import { PlaceItemComponent } from './places/place-item/place-item.component';
import { GeoSearchModule } from './geo-search/geo-search.module';
import { SharedModule } from './shared/shared.module';
import { PlacesListItemComponent } from './places/places-list-item/places-list-item.component';
import { GeoModule } from './geo/geo.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
      imports: [
        CovalentCoreModule.forRoot(),
        AppRoutingModule,
        GeoSearchModule,
        SharedModule,
        GeoModule,
        StoreModule.provideStore({})
      ],
      declarations: [
        AppComponent,
        GeoHeaderComponent,
        FooterComponent,
        PlacesComponent,
        PlaceItemComponent,
        PlacesListItemComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

});

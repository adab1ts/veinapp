/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovalentCoreModule } from '@covalent/core';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { PlacesComponent } from './places.component';
import { PlacesListItemComponent } from './places-list-item/places-list-item.component';
import { AppRoutingModule } from '../app-routing.module';
import { PlaceItemComponent } from './place-item/place-item.component';

describe('PlacesListComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
      imports: [
        CovalentCoreModule.forRoot(),
        AppRoutingModule,
        StoreModule.provideStore({}) ],
      declarations: [
        PlacesComponent,
        PlacesListItemComponent,
        PlaceItemComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

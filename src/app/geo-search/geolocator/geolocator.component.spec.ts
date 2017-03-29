/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovalentCoreModule } from '@covalent/core';

import { GeolocatorComponent } from './geolocator.component';

describe('GeolocatorComponent', () => {
  let component: GeolocatorComponent;
  let fixture: ComponentFixture<GeolocatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CovalentCoreModule.forRoot() ],
      declarations: [ GeolocatorComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create geolocator component', () => {
    expect(component).toBeTruthy();
  });
});

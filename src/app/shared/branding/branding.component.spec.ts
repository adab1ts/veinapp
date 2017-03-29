/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BrandingComponent } from './branding.component';

describe('BrandingComponent', () => {
  let component: BrandingComponent;
  let fixture: ComponentFixture<BrandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the branding component', () => {
    expect(component).toBeTruthy();
  });
});

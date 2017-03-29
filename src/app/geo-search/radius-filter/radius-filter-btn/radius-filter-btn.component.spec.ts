/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovalentCoreModule } from '@covalent/core';

import { RadiusFilterBtnComponent } from './radius-filter-btn.component';

describe('RadiusFilterBtnComponent', () => {
  let component: RadiusFilterBtnComponent;
  let fixture: ComponentFixture<RadiusFilterBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CovalentCoreModule.forRoot()],
      declarations: [ RadiusFilterBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiusFilterBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create radius filter btn component', () => {
    expect(component).toBeTruthy();
  });
});

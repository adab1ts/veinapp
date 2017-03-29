/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CovalentCoreModule } from '@covalent/core';

import { ActivityIndicatorComponent } from './activity-indicator.component';

describe('ActivityIndicatorComponent', () => {
  let component: ActivityIndicatorComponent;
  let fixture: ComponentFixture<ActivityIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CovalentCoreModule.forRoot()],
      declarations: [ ActivityIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the activity indicator component', () => {
    expect(component).toBeTruthy();
  });
});

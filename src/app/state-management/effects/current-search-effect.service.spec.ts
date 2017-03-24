/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';

import { CurrentSearchEffectService } from './current-search-effect.service';

describe('CurrentSearchEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentSearchEffectService]
    });
  });

  xit('should ...', inject([CurrentSearchEffectService], (service: CurrentSearchEffectService) => {
    expect(service).toBeTruthy();
  }));
});

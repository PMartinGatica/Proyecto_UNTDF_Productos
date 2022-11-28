import { TestBed } from '@angular/core/testing';

import { ProvincesDataService } from './provinces-data.service';

describe('ProvincesDataService', () => {
  let service: ProvincesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvincesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

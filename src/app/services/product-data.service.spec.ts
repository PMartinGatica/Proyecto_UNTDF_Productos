import { TestBed } from '@angular/core/testing';

import { ProductDataService } from './product-data.service';

describe('PricesDataService', () => {
  let service: ProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

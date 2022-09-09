import { TestBed } from '@angular/core/testing';

import { CountryDetailsResolverService } from './country-details-resolver.service';

describe('CountryDetailsResolverService', () => {
  let service: CountryDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CountriesResolverService } from './countries-resolver.service';

describe('CountriesResolverService', () => {
  let service: CountriesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

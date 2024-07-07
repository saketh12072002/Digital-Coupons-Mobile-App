import { TestBed } from '@angular/core/testing';

import { OrganisersService } from './organisers.service';

describe('OrganisersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganisersService = TestBed.get(OrganisersService);
    expect(service).toBeTruthy();
  });
});

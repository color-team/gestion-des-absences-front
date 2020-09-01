import { TestBed } from '@angular/core/testing';

import { ServiceVisuService } from './service-visu.service';

describe('ServiceVisuService', () => {
  let service: ServiceVisuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceVisuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VdjcServiceService } from './vdjc-service.service';

describe('VdjcServiceService', () => {
  let service: VdjcServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VdjcServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ValidationDemandeService } from './validation-demande.service';

describe('ValidationDemandeService', () => {
  let service: ValidationDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationDemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

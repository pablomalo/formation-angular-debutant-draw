import { TestBed } from '@angular/core/testing';

import { DrawServicesService } from './draw-services.service';

describe('DrawServicesService', () => {
  let service: DrawServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

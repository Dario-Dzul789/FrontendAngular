import { TestBed } from '@angular/core/testing';

import { VentasdetallesService } from './ventasdetalles.service';

describe('VentasdetallesService', () => {
  let service: VentasdetallesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasdetallesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

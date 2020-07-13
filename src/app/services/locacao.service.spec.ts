import { TestBed } from '@angular/core/testing';

import { LocacaoService } from './locacao.service';

describe('LocacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocacaoService = TestBed.get(LocacaoService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SettingsGuard.ServiceService } from './settings-guard.service.service';

describe('SettingsGuard.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsGuard.ServiceService = TestBed.get(SettingsGuard.ServiceService);
    expect(service).toBeTruthy();
  });
});

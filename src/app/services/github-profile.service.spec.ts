import { TestBed } from '@angular/core/testing';

import { GithubProfileService } from './github-profile.service';

describe('GithubProfileService', () => {
  let service: GithubProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

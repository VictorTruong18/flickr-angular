import { TestBed } from '@angular/core/testing';

import { FlickrSearchService } from './flickr-search.service';

describe('FlickrSearchService', () => {
  let service: FlickrSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlickrSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

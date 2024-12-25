import { TestBed } from '@angular/core/testing';

import { BookStreamService } from './book-stream.service';

describe('BookStreamService', () => {
  let service: BookStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HabitDbService } from './habit-db.service';

describe('HabitServiceService', () => {
  let service: HabitDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

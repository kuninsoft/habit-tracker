import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitCounterComponent } from './habit-counter.component';

describe('HabitCounterComponent', () => {
  let component: HabitCounterComponent;
  let fixture: ComponentFixture<HabitCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

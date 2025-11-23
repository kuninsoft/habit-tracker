import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitDayViewComponent } from './habit-day-view.component';

describe('HabitDayViewComponent', () => {
  let component: HabitDayViewComponent;
  let fixture: ComponentFixture<HabitDayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitDayViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

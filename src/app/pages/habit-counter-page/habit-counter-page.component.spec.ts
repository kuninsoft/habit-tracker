import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitCounterPageComponent } from './habit-counter-page.component';

describe('HabitCounterPageComponent', () => {
  let component: HabitCounterPageComponent;
  let fixture: ComponentFixture<HabitCounterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitCounterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitCounterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

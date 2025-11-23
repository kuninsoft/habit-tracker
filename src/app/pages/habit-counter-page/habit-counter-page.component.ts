import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HabitCounterComponent } from '../../components/habit-counter/habit-counter.component';
import { HabitDayViewComponent } from "../../components/habit-day-view/habit-day-view.component";
import { HabitEntry } from '../../services/habit-db/habit';
@Component({
  selector: 'app-habit-counter-page',
  imports: [HabitCounterComponent, DatePipe, HabitDayViewComponent],
  templateUrl: './habit-counter-page.component.html',
  styleUrl: './habit-counter-page.component.scss'
})
export class HabitCounterPageComponent {
  date = signal(new Date());

  isDateToday = computed(() => this.date().toDateString() == (new Date()).toDateString())

  protected handleSelect(entry: HabitEntry) {
    this.date.set(new Date(entry.date));
  }
}

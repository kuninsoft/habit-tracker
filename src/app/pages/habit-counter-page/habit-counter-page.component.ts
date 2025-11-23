import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HabitCounterComponent } from '../../components/habit-counter/habit-counter.component';
import { HabitDbService } from '../../services/habit-db/habit-db.service';

@Component({
  selector: 'app-habit-counter-page',
  imports: [HabitCounterComponent, DatePipe],
  templateUrl: './habit-counter-page.component.html',
  styleUrl: './habit-counter-page.component.scss'
})
export class HabitCounterPageComponent {
  date = computed(() => new Date());
}

import { Component, inject, signal } from '@angular/core';
import { HabitDbService } from '../../services/habit-db/habit-db.service';
import { StatisticsModel } from './statistics-model';

@Component({
  selector: 'app-statistics-page',
  imports: [],
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.scss'
})
export class StatisticsPageComponent {
  habitService = inject(HabitDbService);

  statistics = signal<StatisticsModel>(new StatisticsModel());

  async ngOnInit() {
    const habits = await this.habitService.getAllHabits();

    const model = new StatisticsModel();
    model.totalDays = habits.length;
    model.daysPositive = habits.filter(d => d.habitCount > 0).length;
    model.daysNegative = habits.filter(d => d.habitCount < 0).length;
    model.positiveToNegativeRatio = model.daysNegative !== 0 
      ? (model.daysPositive * 1.0) / model.daysNegative
      : model.daysPositive;
    habits.forEach(habit => model.totalNetScore += habit.habitCount);

    this.statistics.set(model);
  }
}

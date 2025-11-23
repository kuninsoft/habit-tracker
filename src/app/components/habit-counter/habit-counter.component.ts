import { Component, inject, input, output, signal } from '@angular/core';
import { HabitDbService } from '../../services/habit-db/habit-db.service';

@Component({
  selector: 'app-habit-counter',
  imports: [],
  templateUrl: './habit-counter.component.html',
  styleUrl: './habit-counter.component.scss'
})
export class HabitCounterComponent {
  habitDb = inject(HabitDbService);

  readonly date = input.required<Date>();
  
  currentCount = signal(0);

  async ngOnInit() {
    this.currentCount.set(await this.getHabitData());
  }

  protected incHabit() {
    this.update(this.currentCount() + 1);
  }

  protected decHabit() {
    this.update(this.currentCount() - 1);
  }

  private async getHabitData() {
    const result = await this.habitDb.getHabitData(this.date());
    return result?.habitCount ?? 0;
  }

  private async update(newCount: number) {
    await this.habitDb.updateHabitData({
      date: this.date().toISOString().split("T")[0],
      habitCount: newCount
    });

    this.currentCount.set(await this.getHabitData());
  }
}

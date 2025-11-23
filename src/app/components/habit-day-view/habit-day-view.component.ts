import { Component, computed, effect, ElementRef, inject, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HabitDbService } from '../../services/habit-db/habit-db.service';
import { HabitEntry } from '../../services/habit-db/habit';

@Component({
  selector: 'app-habit-day-view',
  imports: [DatePipe],
  templateUrl: './habit-day-view.component.html',
  styleUrl: './habit-day-view.component.scss'
})
export class HabitDayViewComponent {
  private habitService = inject(HabitDbService);

  protected habitEntries = computed(() => this.habitService.allHabits());
  protected selected = signal<HabitEntry | null>(null);

  select = output<HabitEntry>();

  constructor(private host: ElementRef<HTMLElement>) {
    // Set initial selection when entries first load
    effect(() => {
      const entries = this.habitEntries();
      if (entries.length === 0) {
        this.selected.set(null);
        return;
      }
      
      if (!this.selected()) {
        const last = entries[entries.length - 1];
        this.selectEntry(last);
      }
    });
  }

  ngAfterViewInit() {
    // Scroll to end initially
    const el = this.host.nativeElement;
    el.scrollLeft = el.scrollWidth;
  }

  protected selectEntry(entry: HabitEntry) {
    if (entry?.id === this.selected()?.id) {
      return;
    }

    this.selected.set(entry);
    this.select.emit(entry);
  } 
}

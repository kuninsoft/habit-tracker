import { Routes } from '@angular/router';
import { HabitCounterPageComponent } from './pages/habit-counter-page/habit-counter-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HabitCounterPageComponent
    },
    {
        path: 'statistics',
        component: StatisticsPageComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];

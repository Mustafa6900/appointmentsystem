import { Routes } from '@angular/router';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
export const routes: Routes = [
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentListComponent },
];

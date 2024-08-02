import { Routes } from '@angular/router';
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentFormComponent },
];

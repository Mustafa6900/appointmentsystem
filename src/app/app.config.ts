import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppointmentService } from './services/appointment.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    AppointmentService,
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase())
  ]
};

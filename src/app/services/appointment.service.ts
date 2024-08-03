import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Database, ref, push, child, get, set } from '@angular/fire/database';
import { Appointment } from '../models/appointment.model';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AppointmentService {
  private db: Database = inject(Database);
  private dbPath = 'appointments';

  constructor() { }

  getAppointments(): Observable<Appointment[]> {
    const appointmentsRef = ref(this.db, this.dbPath);
    return from(get(appointmentsRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          return Object.keys(data).map(key => ({ ...data[key], id: key }));
        } else {
          return [];
        }
      }),
      catchError(error => {
        console.error('Error fetching appointments:', error);
        throw error;
      })
    );
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    const appointmentsRef = ref(this.db, this.dbPath);
    const newAppointmentRef = push(appointmentsRef);

    return from(set(newAppointmentRef, appointment)).pipe(
      map(() => {
        appointment.id = newAppointmentRef.key ?? undefined; // `null` değerini `undefined` olarak ayarla
        return appointment;
      }),
      catchError(error => {
        console.error('Error adding appointment:', error);
        throw error;
      })
    );
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    if (!appointment.id) {
      throw new Error('Appointment ID is missing');
    }

    const appointmentRef = child(ref(this.db, this.dbPath), appointment.id);
    return from(set(appointmentRef, appointment)).pipe(
      map(() => appointment),
      catchError(error => {
        console.error('Error updating appointment:', error);
        throw error;
      })
    );
  }

  deleteAppointment(id: string): Observable<void> {
    const appointmentRef = child(ref(this.db, this.dbPath), id);
    return from(set(appointmentRef, null)).pipe(
      catchError(error => {
        console.error('Error deleting appointment:', error);
        throw error;
      })
    );
  }
}